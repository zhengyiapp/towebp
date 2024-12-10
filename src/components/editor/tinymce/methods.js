export const useTinyConfig = () => {
  return {
    suffix: '.min',
    language: 'zh_CN',
    language_url: '/assets/tinymce/langs/zh_CN.js',
    base_url: '/assets/tinymce',
    relative_urls: false, // 禁用自动处理相对路径
    document_base_url: '',
    menubar: false,
    default_link_target: '_blank',
    placeholder: '请输入正文内容',
    branding: false, // 显示 tinymec logo
    toolbar: 'styles bold italic underline strikethrough forecolor backcolor | link unlink alignleft aligncenter numlist bullist emoticons image cloud paid | code removeformat fullscreen |',
    plugins: 'code emoticons link image lists fullscreen',
    valid_children: '+div[style]',
    statusbar: false,
  }
}

export const imagesUploadHandler = (imageBaseUrl) => {
  return (blobInfo, progress) => new Promise(async (resolve, reject) => {
    const { start } = await uploadImg({
      fileItem: {
        file: blobInfo.blob(),
        name: blobInfo.filename(),
      },
      progress,
    })
    const imgurl = await start
    if (imgurl) resolve(`${imageBaseUrl}${imgurl.slice(1)}`)
    else reject('图片上传失败')
  })
}

export const cloudUploader = function(editor, files){
  if (files && files.length) {
    let content = ''
    for(let file of files){
      let { src, blobSrc } = file
      const isCF = file.platform == 3
      switch(file.pid) {
        case 'pic':
          content += `<img img-lazy class=cf-source src="${blobSrc?blobSrc:`${src}?980`}" alt="${file.name}" data-cf=${isCF?1:0} data-src="${src}?980">`
          break
        default:
          content += `附件:<a class=cf-source target="_blank" href="${src}" data-cf=${isCF?1:0} data-src="${src}">${file.name}.${file.ext}</a>`
      }
    }
    if (content) {
      editor.execCommand('mceInsertContent', false, content)
    }
  }
}