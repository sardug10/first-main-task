import React, {useState, useEffect, useReducer} from 'react'
import ModalUpper from './ModalUpper';
import ModalMiddle from './ModalMiddle';
import ModalBottom from './ModalBottom';
import { getData } from './../services/getData';

const Modal = () => {

    const [data, setData] = useState([])
    const [errorState, setErrorState] = useState(false)

    const reducer = (state, action)=>{
        switch (action.type) {
            case 'initial':
                return { ...state, ...action.payload }
            case 'updateOrder':
                const {key, idx, type} = action.payload
                let newState = JSON.stringify(state)
                newState = JSON.parse(newState)

                if(type === 'radio') {
                    newState[key.name] = data[key.idx].choices[idx].name
                }
                if(type === 'checkbox'){
                    const selectedChoice = data[key.idx].choices[idx]
                    let ifExists = false
                    let prevIdx = 0
                    newState[key.name].forEach((choice, index)=>{
                        if(JSON.stringify(choice) === JSON.stringify(selectedChoice)) {
                            ifExists = true
                            prevIdx = index
                        }
                    })
                    console.log(ifExists)
                    if(key.name === 'Choice of Sauce' && newState[key.name].length === 3){
                            if(ifExists === false){
                                setErrorState(true)
                                setTimeout(()=>setErrorState(false),3000)
                                return newState
                            } 
                            else{
                                newState[key.name].splice(prevIdx, 1)
                            }
                            return newState
                        }
                    if(ifExists === false) newState[key.name].push(selectedChoice)
                        else{
                            newState[key.name].splice(prevIdx, 1)
                        }
                    }
                    console.log(newState)
                return newState
            case 'test':
                return 'error'
            default:
                    return state
        }
    }
    const [order, setOrder] = useReducer(reducer, {})

    useEffect(()=>{
        let mounted = true
        getData().then(dataItems=>{
            console.log(dataItems.data)
            if(mounted){
                setData(dataItems.data)
            } 
        })
        return ()=>mounted=false
    },[])

    useEffect(()=>{
        let initialOrder = {}
        data.forEach((el)=>{
            initialOrder[el.category] = el.limit === 1 ? el.choices[0].name : []
        })
        console.log(initialOrder)
        setOrder({type:'initial',payload:initialOrder})
    },[data])

    const onOrderChange = (key, idx, type)=>{
        console.log(key, idx, type)
        setOrder({type:'updateOrder',payload:{key, idx, type}})
    }

    return (
        <div className='modal'>
            { data && <ModalUpper data={data} />}
            { data && <ModalMiddle data={data} order={order} onOrderChange={onOrderChange} />}
            { errorState && <div className="modal__error">You can select a maximum of 3 Choice of Sauce Any (3).</div>}
            { data && <ModalBottom data={data} order={order} />}
        </div>
    )
}

export default Modal

/* 
Choice of Bread

Multigrain Bread

Multigrain Honey Oats Bread

Italian Bread
Unavailable

Roasted Garlic Bread
Unavailable

Parmesan Oregano Bread
Unavailable

Flat Bread
Choice of Preparation

Plain Bread

Plain Bread With Cheese Slice

Toasted Bread

Toasted Bread With Cheese Slice

Toasted With Mozzarella Cheese
Unavailable
Choice of Beverages(optional)
Life Juice (250 Ml, Raw Pressery) Pet Bottle142.86
Unavailable
Pomegranate Juice (250 Ml, Raw Pressery) Pet Bottle142.86
Unavailable
Valencia Orange Juice (250 Ml, Raw Pressery) Pet Bottle95.24
Unavailable
Mixed Fruits Juice (250 Ml, Raw Pressery) Pet Bottle76.19
Unavailable
Sugarcane Juice (250 Ml, Raw Pressery) Pet Bottle76.19
Unavailable
Choco Mint Protein Milkshake (200ml, Raw Pressery) Pet Bottle76.19
Unavailable
Coconut Water (200 Ml, Raw Pressery) Pet Bottle57.14
Unavailable
7 Up (330 Ml ) Can 57.14
Unavailable
Mirinda (330 Ml ) Can 57.14
Unavailable
Pepsi (330 Ml ) Can 57.14
Unavailable
Lipton Ice Tea (250 Ml) Pet Bottle 47.62
Unavailable
Pepsi (500 Ml) Pet Bottle 57.14
Unavailable
Slice Bottle (350 Ml) 47.62
Unavailable
7 Up Nimbooz (250 Ml) Pet Bottle 47.62
Unavailable
Mirinda (500 Ml) Pet Bottle 57.14
Unavailable
7 Up (500 Ml) Pet Bottle 57.14
Unavailable
Choice of Vegetables(optional)
Lettuce
Tomato
Cucumber
Pickle
Capsicum
Olives
Unavailable
Onions
Jalapenos
Salt And Pepper
Choice of Sauce Any (3)(optional)
Mayonnaise
Mint Mayonnaise
Chipotle South West
Honey Mustard
Red Chilli
Marinara
Barbeque
Tandoori Mayo
Unavailable
Sweet Onion
Add On(optional)
Cheese Slice 23.81
Mozzarella Cheese 23.81
Egg 42.86
Veg Protein 57.14
Unavailable
*/