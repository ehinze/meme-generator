import React from "react"

export default function Form(){
    const [memeImage, setMemeImage] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"  
    })

    // this is how to fetch an api 

    const [allMemes, setAllMemes] = React.useState([])
     React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])

    // this is a method of using async
    // useEffect takes a function as its parameter. If that function
    // returns something, it needs to be a cleanup function. Otherwise,
    // it should return nothing. If we make it an async function, it
    // automatically retuns a promise instead of a function or nothing.
    // Therefore, if you want to use async operations inside of useEffect,
    // you need to define the function separately inside of the callback
    // function, as seen below:



    // const [allMemes, setAllMemes] = React.useState([])
    // React.useEffect(() => {
    //     async function getMemes() {
    //         const res = await fetch("https://api.imgflip.com/get_memes")
    //         const data = await res.json()
    //         setAllMemes(data.data.memes)
    //     }
    //     getMemes()
    // }, [])

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMemeImage(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
    }
    
//    this is for the input
    function handleChange(event) {
        const {name, value} = event.target
        setMemeImage(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }


    return(
        <div className='main'>
            <div className='form'>
                <div>
                    <label> Top Text
                    <input type="text"
                            placeholder="Shut up"
                            name="topText"
                            value={memeImage.topText}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                    <div>
                        <label> Bottom Text
                        <input type="text"
                         placeholder="and take my money"
                         name="bottomText"
                         value={memeImage. bottomText} 
                         onChange={handleChange}
                          /> 
                        </label>
                    </div>
                    <button    onClick={getMemeImage} >Get a new meme image 🖼</button>
                </div>
                <div className="meme">
                    <img src={memeImage.randomImage} className="meme--image" />
                    <h2 className="meme--text top">{memeImage.topText}</h2>
                    <h2 className="meme--text bottom">{memeImage. bottomText}</h2>
                </div>
        </div>
    )
}