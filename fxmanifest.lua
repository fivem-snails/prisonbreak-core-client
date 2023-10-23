fx_version 'cerulean'
game 'gta5'

ui_page 'web/dist/index.html'

files {
    'web/dist/index.html',
    'web/dist/assets/*.css', 
    'web/dist/assets/*.js'
}

client_scripts {
    'src/**.js'
}

data_file 'DLC_POP_GROUPS' 'popgroups.ymt'
