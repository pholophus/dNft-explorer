import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import {modalStyles} from "../../../styles/index";
import {KeyPair} from "../../../interface/index";
import { get_cids_from_table, get_content_from_cid, generate_new_keypair } from '../../../_aqua/fdb'


export const CollectionModal = (props: any) => {

    console.log("props ",props)

    const [isNewOpen, setNewColOpen] = useState(true);
    const [keypair, setKeypair] = useState<KeyPair>();

    const onGenerateKey = async() => {
        const keypair = await generate_new_keypair()
        setKeypair(keypair as KeyPair)
    }

    return (
        <>
            <Modal
                isOpen={isNewOpen}
                onRequestClose={() => props.setNewColOpen(false)}
                ariaHideApp={false}
                style={modalStyles}
            >
                <div className='flex justify-between my-3'>
                    <h1>New Collection</h1>
                    <button onClick={() => props.setNewColOpen(false)}>X</button>
                </div>
                <form>
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
                        value={keypair?.pk}
                        />
                    </div>
                    <div className="mb-2 text-left pr-4">
                        <label
                        htmlFor="text"
                        className="block text-sm font-semibold text-gray-800"
                        >
                        Secret Key
                        </label>
                        <input
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        value={keypair?.sk}
                        />
                    </div>
                    <div className="mt-8 flex justify-center ">
                        <button
                        type="button"
                        className="bg-green-500 py-2 px-4 rounded-lg text-white font-semibold hover:bg-green-800 transition-colors"
                        onClick={onGenerateKey}
                        >
                        Generate
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    )
}