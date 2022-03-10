const fs = require('fs')
const path = require('path')

// please enter the file name which you want to change
const fileName = 'index'

const regStyle = /<style>[\s\S]*<\/style>/
const regScript = /<script>[\s\S]*<\/script>/

const js = '<script src="'+fileName+'.js"></script>'
const css = '<link rel="stylesheet" href="'+fileName+'.css">'

fs.readFile(path.join(__dirname,fileName+'.html'),'utf8',function(err,data){
    resolveCSS(data)
    resolveJS(data)
    resolveHTML(data)
})

function resolveCSS(data){
    let CSS = regStyle.exec(data)[0].replace('<style>','').replace('</style>','')
    fs.writeFile(path.join(__dirname,fileName + '.css'),CSS,function(err){
        if(err){
            console.log('resolveCSS error');
        }
    })
}

function resolveJS(data){
    let JS = regScript.exec(data)[0].replace('<script>','').replace('</script>','')
    fs.writeFile(path.join(__dirname,fileName + '.js'),JS,function(err){
        if(err){
            console.log('resolveJS error');
        }
    })
}

function resolveHTML(data){
    fs.writeFile(path.join(__dirname,fileName + '.html'),data.replace(regScript.exec(data)[0],js).replace(regStyle.exec(data)[0],css),function(err){
        if(err){
            console.log('resolveHTML error');
        }
    })
}