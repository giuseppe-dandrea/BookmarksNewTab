let create_div = (node) => {
	let div = $('<div>', {
		id: node.id,
		class: "class-folder",
	}).appendTo("#main-container");

	let title = $('<h2>', {
		text: node.title,
	}).appendTo(div);

	for (let i in node.children) {
		create_node_element(node.children[i], div);
	}
}

let append_to_no_folder = (node) => {
	if ($("#-1")) {
		// create node element
	} else {
		$('<div>', {
			id: "-1",
			class: "class-folder",
		}).appendTo("#main-container");
	}
}

let create_node_element = (node, parent_div) => {
	if (node.children) {
		// Create folder
		let div = $('<div>', {
			id: node.id,
			class: "class-folder-bookmark",
		}).appendTo(parent_div);
		
		let button = $('<button>', {
			class: "btn btn-info class-folder-bookmark-link",
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

		let url_split = node.url.split('/');
		let favicon_url = url_split[0] + '//' + url_split[2] + '/favicon.ico';
		
		let img = $('<img>', {
			class: "class-favicon",
			src: favicon_url,
		}).appendTo(div);
		
		let a = $('<a>', {
			class: "class-bookmark-link",
			href: node.url,
			text: node.title,
		}).appendTo(div);
	}
}

let generate_ui = async (root_node) => {
	let node = (await chrome.bookmarks.getSubTree(root_node))[0];

	let h1 = $('<h1>', {
		text: node.title,
	}).prependTo('body');

	for (let child of node.children) {
		if (child.children.length > 0) {
			create_div(child);
		} else {
			append_to_no_folder(child);
		}
	}

	return node.children;
}

let bmFolder = window.localStorage['store.settings.bookmarksFolder'].slice(1, -1);

generate_ui(bmFolder).then(console.log);
