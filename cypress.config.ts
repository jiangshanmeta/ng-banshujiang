import { defineConfig } from 'cypress'


export default defineConfig( {
    projectId: "2a1ivb",
    e2e: {
        'baseUrl': 'http://localhost:4200',
        setupNodeEvents( on, config ) {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            require( '@cypress/code-coverage/task' )( on, config )

            return config
        },
    },
  
  
} )