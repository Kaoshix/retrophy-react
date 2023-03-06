import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function AdminGameCreate() {

    const history = useHistory();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageFile, setImageFile] = useState('');
    const [romFile, setRomFile] = useState('');
    // const [publisher, setPublisher] = useState('');
    // const [genre, setGenre] = useState('');
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('imageFile', imageFile);
    formData.append('romFile', romFile);


    async function handleEdit(event) {

        event.preventDefault();

        const res = await axios.post("http://127.0.0.1:8000/api/games/create", formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                console.log(response.data)
                return response.json()
            })
            .catch(error => console.log(error))
        console.log('yo res', res)
        // console.log(formData);  
        history.push('/admin/games')
    }

    return (

        <form className="login-register-formular" onSubmit={handleEdit}>
            <div className='input-group'>
                <label htmlFor='title'>Title</label>
                <input
                    className='text-black'
                    type='text'
                    id='title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className='input-group'>
                <label htmlFor='description'>Description</label>
                <input
                    className='text-black'
                    type='textarea'
                    id='description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <div className='input-group'>
                <label htmlFor='imageFile'>Image file</label>
                <input
                    type="file"
                    id="imageFile"
                    name="imageFile"
                    accept="image/png, image/jpeg, image/webp"
                    value={imageFile}
                    onChange={(e) => setImageFile(e.target.value)}
                />
            </div>

            <div className='input-group'>
                <label htmlFor='romFile'>Rom file</label>
                <input
                    type="file"
                    id="romFile"
                    name="romFile"
                    //accept="application/octet-stream"

                    value={romFile}
                    onChange={(e) => setRomFile(e.target.value)}
                />
            </div>

            <div className='register'>
                <button className='register-button' type='submit'>Create</button>
            </div>
        </form>
    );

}