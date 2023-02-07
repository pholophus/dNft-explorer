
import { Fluence } from '@fluencelabs/fluence';
import sha256 from 'crypto-js/sha256'
import { useEffect, useState } from 'react'
// import Modal from 'react-modal'
import { krasnodar } from '@fluencelabs/fluence-network-environment';
import { get_cids_from_table, get_content_from_cid, generate_new_keypair } from '../../_aqua/fdb'
import {addDataModalStyles, modalStyles} from "../../styles/index";
import {FdbDht, KeyPair, DatasetForm} from "../../interface/index";
import {CollectionModal} from "../Explorer/Modals/collectionModal";
import {AddDatasetModal} from "../Explorer/Modals/addDatasetModel";
import {CidModal} from "../Explorer/Modals/cidModal";

const MainExplorer = () => {
  const [isAddOpen, setAddDataOpen] = useState(false);
  const [isNewOpen, setNewColOpen] = useState(false);
  const [isCIDOpen, setCIDOpen] = useState(false);
  const [data, setData] = useState<FdbDht[]>([])
  const [content, setContent] = useState<string>('')
  const [selectedCid, setSelectedCid] = useState('')
  const [search, setSearch] = useState({
    address: '',
    id: ''
  })

  const onSearchClick = async (e: any) => {
    e.preventDefault()

    if (!Fluence.getStatus().isConnected) {
      return;
    }

    const result = sha256(search.address.toLowerCase()+search.id+56+0)

    const r = await get_cids_from_table(String(result))

    setData((r[0] as any).datas as FdbDht[])
  }

  const onHandleChange = (event: any) => {
    setSearch({
      ...search,
      [event.target.name]: event.target.value
    })
  }

  const onClickCid = async (cid: string) => {
    const content = await get_content_from_cid(cid)
    setCIDOpen(true)
    setSelectedCid(cid)
    setContent(content[0].data)
  }

  const onCidOk = async () => {
    setCIDOpen(false)
    setContent('')
  }

  useEffect(() => {
    Fluence.start({ connectTo: krasnodar[5] })
      .catch((err) => console.log("Client initialization failed", err));
  }, []);

  return (
    <>
      <div className="flex w-screen items-center justify-center p-5">
        <div className="w-full rounded-lg w-3/4">
          <div className="flex">
            <input type="text"
              className="w-full bg-white pl-2 border border-blue-500 rounded-lg p-3 mr-2"
              placeholder="Token Address"
              name="address"
              value={search.address}
              onChange={onHandleChange}
            />
            <input
              type="text"
              className="w-1/2 bg-white pl-2 border border-1 rounded-lg border-blue-500 p-3 mr-2"
              placeholder="Token ID"
              name="id"
              value={search.id}
              onChange={onHandleChange}
            />
            <input
              type="button"
              value="Search"
              className="bg-blue-500 p-2 rounded-lg text-white font-semibold hover:bg-blue-800 transition-colors"
              onClick={onSearchClick}
            />
          </div>
        </div>
      </div>
      <div className="flex w-screen items-center justify-center p-5">
        <div className="w-full relative block border border-gray-100 p-2 shadow-sm text-left">
          <div className="mt-1 mb-4 sm:flex sm:items-center sm:justify-between">
            <div className="text-sm text-gray-600">
              Total 4 datasets
            </div>
            <div className="flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
              {/* --------------- ADD DATABASE MODAL ------------  */}
              <input
                type="button"
                value="Add Dataset"
                onClick={() => setAddDataOpen(true)}
                className="bg-green-500 p-2 rounded-lg text-white font-semibold hover:bg-green-800 transition-colors"
              />
              <input
                type="button"
                value="New Collection"
                onClick={() => setNewColOpen(true)}
                className="bg-green-500 p-2 rounded-lg text-white font-semibold hover:bg-green-800 transition-colors"
              />

            </div>
          </div>
          <table className="min-w-full divide-y divide-gray-200 text-sm table-fixed">
            <thead className="bg-gray-100">
              <tr>
                <th
                  className="w-1 whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"
                >
                  Collection
                </th>
                <th
                  className="w-1 whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"
                >
                  Key
                </th>
                <th
                  className="w-1/2 whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"
                >
                  CID
                </th>
                <th
                  className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"
                >
                  Verified
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((d:FdbDht) => {
                return (
                  <tr key={d.public_key}>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      {d.public_key}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{d.key}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 cursor-pointer" onClick={() => onClickCid(d.cid)}>{d.cid}</td>
                    <td className="whitespace-nowrap px-4 py-2">
                      
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* --------------- ADD DATABASE MODAL ------------  */}
      {isAddOpen ? (<AddDatasetModal setAddDataOpen={setAddDataOpen} />) : null}

      {/* --------------- NEW COLLECTION MODAL ------------  */}
      {isNewOpen ? (<CollectionModal setNewColOpen={setNewColOpen} />) : null}

      {/* --------------- CID MODAL ------------  */}
      {isCIDOpen ? (<CidModal selectedCid={selectedCid} content={content} setCIDOpen={setCIDOpen} setContent={setContent}/>) : null}

      {/* {cidModalVisible && <Popup />} */}
    </>
  )
}

export default MainExplorer