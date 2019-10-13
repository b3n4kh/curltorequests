'use strict'

var curlconverter = require('curlconverter')

document.addEventListener('DOMContentLoaded', function () {
  var hash = window.location.hash.replace('#', '')
  if (hash === 'node') {
    changeLanguage('node')
  } else if (hash === 'php') {
    changeLanguage('php')
  } else if (hash === 'r') {
    changeLanguage('r')
  } else if (hash === 'go') {
    changeLanguage('go')
  } else if (hash === 'strest') {
    changeLanguage('strest')
  } else if (hash === 'json') {
    changeLanguage('json')
  } else if (hash === 'rust') {
    changeLanguage('rust')
  } else if (hash === 'dart') {
    changeLanguage('dart')
  } else if (hash === 'ansible') {
    changeLanguage('ansible')
  }

  var curlCodeInput = document.getElementById('curl-code')
  curlCodeInput.addEventListener('keyup', convert)

  // listen for change in select
  var languageSelect = document.getElementById('language')
  languageSelect.addEventListener('change', function () {
    var language = document.getElementById('language').value
    changeLanguage(language)
    if (document.getElementById('curl-code').value) {
      convert()
    }
  })

  var getExample = document.getElementById('get-example')
  getExample.addEventListener('click', function () {
    showExample("curl 'http://en.wikipedia.org/' -H 'Accept-Encoding: gzip, deflate, sdch' " +
      "-H 'Accept-Language: en-US,en;q=0.8' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) " +
      "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36' " +
      "-H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8' " +
      "-H 'Referer: http://www.wikipedia.org/' " +
      " -H 'Connection: keep-alive' --compressed")
  })

  var postExample = document.getElementById('post-example')
  postExample.addEventListener('click', function () {
    showExample("curl 'http://fiddle.jshell.net/echo/html/' -H 'Origin: http://fiddle.jshell.net' " +
      "-H 'Accept-Encoding: gzip, deflate' -H 'Accept-Language: en-US,en;q=0.8' " +
      "-H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) " +
      "Chrome/39.0.2171.95 Safari/537.36' -H 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8' " +
      "-H 'Accept: */*' -H 'Referer: http://fiddle.jshell.net/_display/' -H 'X-Requested-With: XMLHttpRequest' " +
      "-H 'Connection: keep-alive' --data 'msg1=wow&msg2=such' --compressed")
  })

  var basicAuthExample = document.getElementById('basic-auth-example')
  basicAuthExample.addEventListener('click', function () {
    showExample('curl "https://api.test.com/" -u "some_username:some_password"')
  })
})

/*
single point of truth in the dom, YEEEE HAWWWW
 */
var changeLanguage = function (language) {
  var generatedCodeTitle = document.getElementById('generated-code-title')

  if (language === 'node') {
    generatedCodeTitle.innerHTML = 'Node.js'
  } else if (language === 'php') {
    generatedCodeTitle.innerHTML = 'PHP requests'
  } else if (language === 'ansible') {
    generatedCodeTitle.innerHTML = 'Ansible URI'
  } else if (language === 'r') {
    generatedCodeTitle.innerHTML = 'R httr'
  } else if (language === 'go') {
    generatedCodeTitle.innerHTML = 'Go'
  } else if (language === 'strest') {
    generatedCodeTitle.innerHTML = 'Strest'
  } else if (language === 'rust') {
    generatedCodeTitle.innerHTML = 'Rust'
  } else if (language === 'dart') {
    generatedCodeTitle.innerHTML = 'Dart'
  } else if (language === 'json') {
    generatedCodeTitle.innerHTML = 'JSON'
  } else {
    generatedCodeTitle.innerHTML = 'Python requests'
  }
  window.location.hash = '#' + language
  var languageSelect = document.getElementById('language')
  languageSelect.value = language

  return language
}

var getLanguage = function () {
  var languageSelect = document.getElementById('language')
  return languageSelect.value
}

var convert = function () {
  var curlCode = document.getElementById('curl-code').value
  var generatedCode
  if (curlCode.indexOf('curl') === -1) {
    generatedCode = 'Could not parse curl command.'
  } else {
    try {
      var language = getLanguage()
      if (language === 'node') {
        generatedCode = curlconverter.toNode(curlCode)
      } else if (language === 'php') {
        generatedCode = curlconverter.toPhp(curlCode)
      } else if (language === 'r') {
        generatedCode = curlconverter.toR(curlCode)
      } else if (language === 'go') {
        generatedCode = curlconverter.toGo(curlCode)
      } else if (language === 'strest') {
        generatedCode = curlconverter.toStrest(curlCode)
      } else if (language === 'rust') {
        generatedCode = curlconverter.toRust(curlCode)
      } else if (language === 'dart') {
        generatedCode = curlconverter.toDart(curlCode)
      } else if (language === 'json') {
        generatedCode = curlconverter.toJsonString(curlCode)
      } else if (language === 'ansible') {
        generatedCode = curlconverter.toAnsible(curlCode)
      } else {
        generatedCode = curlconverter.toPython(curlCode)
      }
    } catch (e) {
      console.log(e)
      if (curlCode.indexOf('curl') !== 0) {
        generatedCode = 'Error parsing curl command. Your input should start with the word "curl"'
      } else {
        generatedCode = 'Error parsing curl command.'
      }
    }
  }
  document.getElementById('generated-code').value = generatedCode
}

var showExample = function (code) {
  document.getElementById('curl-code').value = code
  convert()
}