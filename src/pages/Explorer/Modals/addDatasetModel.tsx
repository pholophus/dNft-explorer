import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import {modalStyles, addDataModalStyles} from "../../../styles/index";
import {KeyPair} from "../../../interface/index";


export const AddDatasetModal = (props: any) => {

    console.log("props ",props)

    const [isAddOpen, setAddDataOpen] = useState(true);

    const handleDatasetSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const dataSet = document.forms[0];
    };

    return (
        <>
            <Modal
                isOpen={isAddOpen}
                onRequestClose={() => props.setAddDataOpen(false)}
                ariaHideApp={false}
                style={addDataModalStyles}
            >
                <div className='flex justify-between my-3'>
                    <h1>Add Database</h1>
                    <button onClick={() => props.setAddDataOpen(false)}>X</button>
                </div>
                <form onSubmit={handleDatasetSubmit}>
                    <div className=" mb-2 text-left pr-4">
                        <label
                        htmlFor="text"
                        className="block text-sm font-semibold text-gray-800"
                        >
                        Key
                        </label>
                        <input
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        placeholder="Key..."
                        name="key"
                        />
                    </div>
                    <div className="mb-2 text-left pr-4">
                        <label
                        htmlFor="text"
                        className="block text-sm font-semibold text-gray-800"
                        >
                        Public Key
                        </label>
                        <input
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        placeholder="Enter public key"
                        name="publicKey"
                        />
                    </div>
                    <div className="mb-2 text-left pr-4">
                        <label
                        htmlFor="text"
                        className="block text-sm font-semibold text-gray-800"
                        >
                        Value
                        </label>
                        <textarea
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        placeholder="Enter value ..."
                        name="value"
                        />
                    </div>
                    <div className="mb-2 text-left pr-4">
                        <label
                        htmlFor="text"
                        className="block text-sm font-semibold text-gray-800"
                        >
                        Signature
                        </label>
                        <textarea
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        placeholder="Signature"
                        name="signature"
                        />
                    </div>
                    <div className="mb-2 text-left pr-4">
                        <label
                        htmlFor="text"
                        className="block text-sm font-semibold text-gray-800"
                        >
                        Name
                        </label>
                        <textarea
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        placeholder="Name"
                        name="name"
                        />
                    </div>
                    <div className="mt-8 flex justify-center ">
                        <button
                        type="submit"
                        className="bg-green-500 py-2 px-4 rounded-lg text-white font-semibold hover:bg-green-800 transition-colors"
                        >
                        Add
                        </button>
                    </div>
                </form>
            </Modal> 
        </>
    )
}