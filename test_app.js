//A simple test to verify a visible window is opened with a title
var Application = require('spectron').Application
var assert = require('assert')
var path   = require('path')
var electron = require('electron')

const APPLICATION_PATH = path.resolve(
  __dirname, 'main.js');

console.log(APPLICATION_PATH)

var app = new Application({
  args : [APPLICATION_PATH],
  path: electron})

console.log('Running app...')

app.start()
    .then(() => app.browserWindow.isVisible())
    .then((isVisible) => console.log('Main window is visible: ', isVisible))
    .then(() => {
        console.log('Checking text...')
        return app.client.getText('#par')    
    })
    .then((text) => {
        assert.equal(text, "Does this work?")
        console.log("Text: ", text)   
    })
    .then(() => {
        console.log('Checking the windows title...')
        return app.client.getTitle()
    })
    .then((title) => {
        assert.equal(title, 'Hello World!')
        console.log("Title: ", title)
    })
    .then(() => {
        console.log('Stopping the application')
        return app.stop()
    })
    .catch((error) => {
        //Log any failures
        console.error('Test failed: ', error.message)
        console.log('Stopping the application')
        return app.stop()
    })