import React, { useCallback, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'
import { useCart } from 'react-use-cart'
import { setCardInfo } from '../../slices/uiSlice'

import { useDispatch, useSelector } from 'react-redux'
import Aos from 'aos'

import './cards.scss'

export const Cards = ({ data }: any) => {
    const { addItem } = useCart()
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const { activePage } = useSelector((state: any) => state.ui)

    useEffect(() => {
        Aos.init({duration: 1000, once: true})
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },[])

    const showProductInfo = useCallback((e: any) => {
        const id: any = Number(e.currentTarget.id)
        dispatch(setCardInfo({id: id, product: data.product}))
        navigate(`/product-info?Product=${data.product}&activePage=${activePage}&cardId=${id}`)
    },[dispatch, navigate, data, activePage])

    return (
        <div className='cards-list'>
            { data.info.map((pr: any) => (
                <Card className='card' key={pr.id} data-aos='zoom-in'>
                    <Card.Img variant="top" src={pr.img} id={pr.id} data-name={pr.title} onClick={showProductInfo} alt={pr.title}></Card.Img>
                    <Card.Body>
                            <Card.Title className='title'>{pr.title}</Card.Title>
                        <Card.Text>
                        {/* {pr.text} */}
                        </Card.Text>
                        <div className='d-flex justify-content-between add-to-cart'>
                            <Button className='btn-sm add-to-cart-btn' variant="outline-primary" onClick={() => addItem(pr)} id={pr.id}>Добави в кошничката</Button>
                            <span className='fw-bolder'>{pr.price}лв</span>
                        </div>
                    </Card.Body>
                </Card>
            ))}
        </div>
    )
}