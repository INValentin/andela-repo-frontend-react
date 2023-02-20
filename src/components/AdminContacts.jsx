import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import useApi from '../hooks/useApi'

const AdminContacts = () => {
    const [contacts, setContacts] = useState([])
    const fetched = useRef(false)
    const API = useApi()

    useEffect(() => {
        if (fetched.current) return undefined
        fetched.current = true
        API.request(
            API.contacts.list,
            (cts) => setContacts(cts),
            'Contacts fetched successfully'
        )
    }, [])

    const handleDeleteContact = (id) => {
        API.request(
            () => API.contacts.delete(id),
            () => {
                setContacts(contacts.filter(c => c._id !== id))
            },
            "Contact Deleted!"
        )
    }

    return (
        <section className='flex-1 flex flex-col gap-2' >
            <div className="mx-auto max-w-4xl" >
                <h3 className="text-3xl font-bold">Contacts</h3>
                <div className="flex flex-col gap-2">
                    {contacts.map(ctc => (
                        <div style={{borderColor: 'var(--secondary)'}} key={ctc._id} className="p-3 shadow border-solid border-2 border-black rounded flex flex-col w-full gap-2">
                            <div className="contact-name"><span className='mr-2'>{ctc.fullName}</span>{" - "} <span className="text-sm contact-email">{ctc.email}</span></div>

                            <div className="contact-message">{ctc.message}</div>
                            <div className="contact-message"><button onClick={() => handleDeleteContact(ctc._id)} className="contact-remove">Delete?</button></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default AdminContacts