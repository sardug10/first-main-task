import React, {useEffect} from 'react'
import foodMark from '../images/foodMark.png'

const ModalUpper = ({data}) => {

    useEffect(()=>{
        console.log(data)
    },[data])

    return (
        <div className='modal--upper modalSummary'>
            <div className="modalSummary__div modalSummary__div--upper">
                <img src={foodMark} className='modalSummary__food-mark' alt="food-mark" />
                <h3 className="modalSummary__heading">Customize “Tandoori Tofu Sub ( 15 cm, 6 Inch )”</h3>
                <span className="modalSummary__icon"><i className="fa fa-times" aria-hidden="true"></i></span>
            </div>
            <span className="modalSummary__price">&#8377; 204.76</span>
            <div className="modalSummary__div modalSummary__div--lower">
                <ul className="modalSummary__category-list">
                    {
                        data && data.map((el,idx)=>(
                            <li key={idx} className='modalSummary__category'><a href={`#`+el.category} className="modalSummary__link">{el.category} {el.limit !== 1 && el.limit !== -1 ? `Any ${el.limit}` : ''}</a> </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default ModalUpper
