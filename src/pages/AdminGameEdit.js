// Import React

import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

// Export main function
export default function AdminGameEdit() {

    // Declare gameId to match with the route
    const { gameId } = useParams();

    // Declare history to redirect to another page
    const history = useHistory();

    // Declare states to store the values of the inputs
    const [title, setTitle] = useState('');
    const [imageFile, setImageFile] = useState('');
    const [romFile, setRomFile] = useState('');
    const [publishersList, setPublishersList] = useState([]);
    const [publisher, setPublisher] = useState('');

    // Fetch datas from the API to get the publisher and genre
    useEffect(() => {
        async function fetchData() {
            await fetch("https://api/retrophy.fun/api/publishers",
                {
                    method: "GET",
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setPublishersList(data);
                }
                )
                .catch(error => {
                    console.error(error);
                });
        }
        fetchData();
    }, []);



    // Declare the function to handle the submit event
    async function handleEditGame(event) {
        event.preventDefault();

        // Declare formData to store the image and rom files
        const formDataRom = new FormData();
        formDataRom.append('file', romFile, romFile.name);

        const formDataImage = new FormData();
        formDataImage.append('file', imageFile, imageFile.name);

        // Fetch the data to the API and redirect to the games page
        await fetch(`https://api/retrophy.fun/api/games/${gameId}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                publisher: publisher
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });

        await fetch(`https://api/retrophy.fun/api/games/${gameId}/gameRom`, {
            method: "POST",
            body: formDataRom
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });

        await fetch(`https://api/retrophy.fun/api/games/${gameId}/gameImage`, {
            method: "POST",
            body: formDataImage
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });
        history.push('/admin/games')
    };

    return (
        <form className="login-register-formular" onSubmit={handleEditGame}>
            <div className='input-group'>
                <label htmlFor='title'>Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                />
            </div>

            <div className='input-group'>
                <label htmlFor='imageFile'>Image file</label>
                <input
                    type="file"
                    id="imageFile"
                    name="imageFile"
                    accept="image/*"
                    onChange={(e) => {
                        setImageFile(e.target.files[0]);
                    }}
                />
            </div>

            <div className='input-group'>
                <label htmlFor='romFile'>Rom file</label>
                <input
                    type="file"
                    id="romFile"
                    name="romFile"
                    onChange={(e) => {
                        setRomFile(e.target.files[0]);
                    }}
                />
            </div>

            <div className='input-group'>
                <label htmlFor='publisher'>Publisher</label>
                <select
                    id="publisher"
                    name="publisher"
                    onChange={(e) => {
                        setPublisher("/api/publishers/" + e.target.value);
                    }}
                >
                    {publishersList.map(publisher => (
                        <option key={publisher.id} value={publisher.id}>{publisher.name}</option>
                    ))}
                </select>
            </div>

            <div className='register'>
                <button className='register-button' type='submit'>Edit</button>
            </div>
        </form>
    );

}