import params from './params.json' assert {type: 'json'}

const state = {
    inputObject: {},
    outputObject: {},
    error: ''
}

const $ = (selector) => {
    return document.querySelector(selector)
}

const convert = (value) => {
    try {
        state.inputObject = JSON.parse(value)
        state.error = ''
    } catch (e) {
        if (value) state.error = 'Invalid JSON'
        state.outputObject = {}
        return
    }

    document.querySelector('#error').innerHTML = ''
    const originalRation = Object.entries(params).find(item => {
        return item[0] === state.inputObject.distance.unit.trim()
    })?.[1]
    const convertToRation = Object.entries(params).find(item => {
        return item[0] === state.inputObject.convertTo.trim()
    })?.[1]
    const convertedValue =  state.inputObject.distance.value * originalRation / convertToRation

    state.outputObject = {
        unit: state.inputObject.convertTo,
        value: convertedValue
    }
}

const updateElValue = (el,value) => {
    if (el.innerHTML !== value) el.innerHTML = value
}

window.addEventListener('DOMContentLoaded', () => {
    const inputEl = $('#inputObject')
    const outputEl = $('#outputObject')
    const errorEl = $('#error')

    const handleChange = (value) => {
        convert(value)

        updateElValue(inputEl, JSON.stringify(state.inputObject))
        updateElValue(outputEl, JSON.stringify(state.outputObject))
        updateElValue(errorEl, state.error)
    }

    handleChange(JSON.stringify({"distance": {"unit": "m", "value":1}, "convertTo": "ft"}))

    inputEl.addEventListener('input',(e) => handleChange(e.target.value))
})
