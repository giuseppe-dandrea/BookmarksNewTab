window.addEvent("domready", function () {
    // Option 1: Use the manifest:
    new FancySettings.initWithManifest(async function (settings) {
        // settings.manifest.myButton.addEvent("action", function () {
        //     alert("You clicked me!");
        // });

        // chrome.bookmarks.getTree( (bm_tree) => {

        //     let add_folder_rec = (node, list) => {
        //         list.push(node.title);
        //         for (let child of node.children) {
        //             if (child.hasOwnProperty('children')) {
        //                 add_folder_rec(child, list);
        //             }
        //         }
        //     }

        //     let bm_folder_list = [];
        //     let root_node = bm_tree[0];
        //     bm_folder_list.push('root');
        //     for (let child of root_node.children) {
        //         add_folder_rec(child, bm_folder_list);
        //     }
        //     settings.manifest.bookmarksFolder.options = bm_folder_list;
            
        // } );
    });
    
    // Option 2: Do everything manually:
    /*
    var settings = new FancySettings("My Extension", "icon.png");
    
    var username = settings.create({
        "tab": i18n.get("information"),
        "group": i18n.get("login"),
        "name": "username",
        "type": "text",
        "label": i18n.get("username"),
        "text": i18n.get("x-characters")
    });
    
    var password = settings.create({
        "tab": i18n.get("information"),
        "group": i18n.get("login"),
        "name": "password",
        "type": "text",
        "label": i18n.get("password"),
        "text": i18n.get("x-characters-pw"),
        "masked": true
    });
    
    var myDescription = settings.create({
        "tab": i18n.get("information"),
        "group": i18n.get("login"),
        "name": "myDescription",
        "type": "description",
        "text": i18n.get("description")
    });
    
    var myButton = settings.create({
        "tab": "Information",
        "group": "Logout",
        "name": "myButton",
        "type": "button",
        "label": "Disconnect:",
        "text": "Logout"
    });
    
    // ...
    
    myButton.addEvent("action", function () {
        alert("You clicked me!");
    });
    
    settings.align([
        username,
        password
    ]);
    */
});
