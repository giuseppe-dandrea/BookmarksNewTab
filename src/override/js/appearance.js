let get_option = (option, fallback) => {
	option = `store.settings.${option}`;
	let optionValue = window.localStorage[option];
	if (optionValue === undefined) {
		window.localStorage[option] = `"${fallback}"`;
		return fallback;
	} else {
		optionValue = optionValue.slice(1, -1);
	}
	return optionValue;
}

let load_css = (path) => {
	$('<link>', {
		rel: "stylesheet",
		type: "text/css",
		href: path,
	}).appendTo("head");
}

let layout = get_option("layout", "horizontal");
load_css(`css/layout/${layout}.css`);

