module.exports = {
    // Port for Node-RED UI (different from your main server)
    uiPort: process.env.PORT || 1881,
    
    // User directory for Node-RED files
    userDir: './node-red/',
    
    // Flow file name
    flowFile: 'flows.json',
    
    // Credential secret for encryption
    credentialSecret: "healthcare-iot-node-red-secret",
    
    // Admin API security
    adminAuth: {
        type: "credentials",
        users: [{
            username: "admin",
            password: "$2b$08$zZWtXTja0fB1pzD4sHCMyOCMYz2Z6dNbM6tl8sJogENOMcxWV9DN.",  // Password: admin
            permissions: "*"
        }]
    },
    
    // Enable project feature
    editorTheme: {
        projects: {
            enabled: false
        },
        palette: {
            editable: true
        },
        header: {
            title: "Healthcare IoT Node-RED",
            image: null
        },
        menu: {
            "menu-item-help": {
                label: "Node-RED Documentation",
                url: "https://nodered.org/docs"
            }
        }
    },
    
    // Function node settings
    functionGlobalContext: {
        // os:require('os'),
    },
    
    // Logging
    logging: {
        console: {
            level: "info",
            metrics: false,
            audit: false
        }
    },
    
    // Export HTTP
    exportGlobalContextKeys: false,
    
    // Context storage
    contextStorage: {
        default: {
            module: "memory"
        }
    }
}
