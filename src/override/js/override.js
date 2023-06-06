let create_div = (node) => {
	let div = $('<div>', {
		id: node.id,
		class: "class-folder",
	}).appendTo("#main-container");

	let title = $('<h2>', {
		class: "class-folder-title",
		text: node.title,
		id: node.id,
		click: () => on_click_folder(node.id)
	}).appendTo(div);

	for (let i in node.children) {
		create_node_element(node.children[i], div);
	}
}

let favicon_url = (u) => {
	const url = new URL(chrome.runtime.getURL("/_favicon/"));
	url.searchParams.set("pageUrl", u);
	url.searchParams.set("size", "64");
	return url.toString();
}

let create_node_element = (node, parent_div) => {
	if (node.children) {
		// Create folder
		let div = $('<div>', {
			class: "class-bookmark-folder",
		}).appendTo(parent_div);
		
		let button = $('<button>', {
			class: "btn btn-block btn-info class-bookmark-folder-link",
			id: node.id,
			type: "button",
			text: node.title,
		}).appendTo(div);

		let i = $('<i>', {
			class: "fa fa-folder",
		}).prependTo(button);

	} else {
		// Create link
		let div = $('<div>', {
			id: node.id,
			class: "class-bookmark",
		}).appendTo(parent_div);
		
		let button = $('<a>', {
			class: "btn btn-block btn-secondary class-bookmark-link",
			href: node.url,
			text: node.title,
		}).appendTo(div);

		let img = $('<img>', {
			class: "class-favicon",
			src: favicon_url(node.url),
		}).prependTo(button);
	}
}

let generate_ui = async (root_node_id) => {
	let node = (await chrome.bookmarks.getSubTree(root_node_id))[0];
	let body = $('body');

	let h1 = $('<h1>', {
		text: node.title,
	}).appendTo(body);

	if (root_node_id !== "0") {
		let parent_button = $('<i>', {
			class: "fa fa-arrow-up",
			click: () => on_click_folder(node.parentId)
		}).appendTo(body);
	}

	let mainDiv = $('<div>', {
		id: 'main-container' 
	}).appendTo(body);

	let noFolderDiv = $('<div>', {
			id: "-1",
			class: "class-folder",
		}).prependTo(mainDiv);

	for (let child of node.children) {
		if (child.children) {
			create_div(child);
		} else {
			create_node_element(child, noFolderDiv);
		}
	}

	return node.children;
}

let clear_ui = () => {
	$('body').empty();
}

let on_click_folder = (node_id) => {
	clear_ui();
	generate_ui(node_id).then(add_onclick_listener);
}

let add_onclick_listener = () => {
	$('.class-bookmark-folder-link').each( function() {
		$(this).click( () => {
			on_click_folder($(this).attr('id'));
		});
	});
}

// let bmFolder = window.localStorage['store.settings.bookmarksFolder'].slice(1, -1);
let bmFolder = get_option("bookmarksFolder", "0")
generate_ui(bmFolder).then(add_onclick_listener);
