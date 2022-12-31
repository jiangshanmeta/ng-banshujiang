module.exports = {
    plugins: [require('prettier-plugin-tailwindcss')],
    tailwindConfig: './tailwind.config.js',
    "bracketSpacing": true,
    "printWidth": 300,
    "tabWidth": 4,
    "useTabs": false,
    "semi": false,
    "singleQuote": true,
    "trailingComma": "none",
    overrides:[
        {
            files:"*.html",
            options:{
                parser:"html"
            }
        }
    ]
}