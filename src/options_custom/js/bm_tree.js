var bm_folder_list = [];

chrome.bookmarks.getTree( (bm_tree) => {
	let add_folder_rec = (node, list, level) => {
		list.push({
			"value": node.id,
			"text": "...".repeat(level) + node.title,
		});
		for (let child of node.children) {
			if (child.hasOwnProperty('children')) {
				add_folder_rec(child, list, level + 1);
			}
		}
	}

	let root_node = bm_tree[0];
	bm_folder_list.push({
		"value": "0",
		"text": "root",
	});
	for (let child of root_node.children) {
		add_folder_rec(child, bm_folder_list, 1);
	}
} );