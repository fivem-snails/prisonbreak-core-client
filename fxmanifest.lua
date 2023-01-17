fx_version 'cerulean'
game 'gta5'

ui_page 'src/web/build/index.html'

files {
    'src/web/build/index.html',
    'src/web/build/static/css/*.css', 
    'src/web/build/static/js/*.js',
    'src/web/build/static/media/chalet.0b050e3931bdee7b4e47.woff',
    'src/web/build/static/media/background-min.233fbcbd59b1173cb8aa.jpg'
}

client_scripts {
    'dist/**.js'
}

data_file 'DLC_POP_GROUPS' 'popgroups.ymt'
