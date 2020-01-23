import React from 'react'

const LyricsFormatOptions = (props) => {
  console.log(props)
  return (
    <form className="ui form grid centered">
      <div className="inline fields">
        <div className="field">
          <div className="ui radio checkbox">
            <input
              type="radio"
              value="default"
              checked={props.value === "default"}
              className="ui radio checkbox"
            />
            <label>Default</label>
          </div>
        </div>
        <div className="field">
          <div className="ui radio checkbox">
            <input
              type="radio"
              value="same-line"
              checked={props.value === "same-line"}
            />
            <label>Same Line</label>
          </div>
        </div>
        <div className="field">
          <div className="ui radio checkbox">
            <input
              type="radio"
              value="single-column"
              checked={props.value === "single-column"}
              className="ui radio checkbox"
            />
            <label>Single Column</label>
          </div>
        </div>
      </div>
    </form>
  )
}

export default LyricsFormatOptions
