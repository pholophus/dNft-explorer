import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import {modalStyles, addDataModalStyles} from "../../../styles/index";
import {KeyPair} from "../../../interface/index";


export const CidModal = (props: any) => {

    const [isCIDOpen, setCIDOpen] = useState(true);

    return (
        <>
            <Modal
                isOpen={isCIDOpen}
                onRequestClose={() => props.setCIDOpen(false)}
                ariaHideApp={false}
                style={modalStyles}
            >
                <div className='flex justify-between my-3'>
                    <h1>CID</h1>
                    <button onClick={() => props.setCIDOpen(false)}>X</button>
                </div>
                <form>
                    <div className="mb-2 text-left pr-4">
                        <label
                        htmlFor="text"
                        className="block text-sm font-semibold text-gray-800"
                        >
                        CID: {props.selectedCid}
                        </label>
                        <textarea
                        className="h-36 block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        placeholder="CID"
                        value={props.content}
                        />
                    </div>
                    <div className="mt-8 flex justify-center ">
                        <button
                        type="button"
                        className="bg-green-500 py-2 px-4 rounded-lg text-white font-semibold hover:bg-green-800 transition-colors"
                        onClick={props.onCidOk}
                        >
                            Ok
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    )
}