interface NodeType {
    color: string;
    bgcolor: string;
    groupcolor: string;
    class_type: string;
    onDeselected: (() => void) | null;
}

const JTILS = "𝓙tils";
const SEARCH_NODES_BY_CLASS_TYPE = "Search Nodes by Class Type";
const VERSION = "Version";

interface JtilsType {
    [SEARCH_NODES_BY_CLASS_TYPE]: () => Promise<void>;
    [VERSION]: () => Promise<void>;
}

async function loadModules() {
    const appModule = await import(/* webpackIgnore: true */'../../../'+'scripts/app.js');
    const apiModule = await import(/* webpackIgnore: true */'../../../'+'scripts/api.js');
    return { app: appModule.app, api: apiModule.api };
}

const selectedNode: NodeType = {
    color: "#792243", 
    bgcolor: "#880E4F", 
    groupcolor: "#FF5984",
    class_type: "None",
    onDeselected: null
};

const Jtils: JtilsType = {
    [SEARCH_NODES_BY_CLASS_TYPE]: async (): Promise<void> => {
        const { app } = await loadModules();
        const nodes = (await app.graphToPrompt()).output;
        let queryString = prompt( "Please enter the search string:", "")?.trim()+"";
        if (queryString === null) queryString = "";
        const filteredNodes = Object.entries(nodes).filter(([nodeId]) => {
            const node: NodeType = nodes[nodeId];
            return queryString === "" ? node.class_type === undefined : node.class_type?.toLowerCase().includes(queryString.toLowerCase())
        });
        filteredNodes.forEach(([nodeId]) => {
            const node: NodeType | undefined = app.graph.getNodeById(nodeId);
            if (!node) return;
            console.log(node);
            let { color, bgcolor, groupcolor } = node;
            Object.assign(node, { color: selectedNode.color, bgcolor: selectedNode.bgcolor, groupcolor: selectedNode.groupcolor });
            node.onDeselected = () => {
                Object.assign(node, { bgcolor, color, groupcolor });
                node.onDeselected = null;
            };
        });
        app.canvas.canvas.data.selectNodes(Object.values(filteredNodes).map(([nodeId]) =>
            app.graph.getNodeById(nodeId))
        );
    },
    [VERSION]: async (): Promise<void> => {
        console.log(JTILS, 'v0.0.1');
    }
};

setTimeout(async () => {
    const Proto = (window as any).LGraphCanvas.prototype.getCanvasMenuOptions;
    (window as any).LGraphCanvas.prototype.getCanvasMenuOptions = function () {
        const options = Proto.apply(this, arguments);
        options.push(
            null,
            {
                content: JTILS,
                has_submenu: true,
                submenu: {
                    options: Object.entries(Jtils).map(([name, func]) => ({
                        content: name,
                        callback: func
                    }))
                }
            }
        );
        return options;
    };
    fetch('/Jtils/version').then(async (res) => {
        const data = await res.json();
        console.log(`${JTILS} Loaded`,data);
    });
}, 10);