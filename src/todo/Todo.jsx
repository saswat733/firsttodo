import React, { useState, useEffect } from 'react'
import "./Todo.css"

const getlocalstoragedata = () => {
    const lists = localStorage.getItem("mytodolist");
    if (lists) {
        return JSON.parse(lists)
    }
    else {
        return [];
    }
}
const Todo = () => {
    const [Data, setData] = useState("")
    const [item, setitem] = useState(getlocalstoragedata());
    const [edit, setedit] = useState("")
    const [togglebtn, settogglebtn] = useState(false)

    // adding
    const additem = () => {
        if (!Data) {
            alert("Please Fill The Data.")
        }
        else if (Data && togglebtn) {
            setitem(
                item.map((ele) => {
                    if (ele.id === edit) {
                        return { ...ele, name: Data };
                    }
                    return ele;
                })
            )
            setData([]);
            setedit();
            settogglebtn(false);
        }
        else {
            const mynewinputdata = {
                id: new Date().getTime().toString(),
                name: Data,
            }
            setitem([...item, mynewinputdata])
            setData("");
        }
    }

    //update
    const edititem = (index) => {
        const item_edited = item.find((ele) => {
            return ele.id === index;
        });
        setData(item_edited.name);
        setedit(index);
        settogglebtn(true);

    }


    const deletitem = (index) => {
        const updateditem = item.filter((ele) => {
            return ele.id != index;
        })
        setitem(updateditem)
    }

    const removeall = () => {
        setitem([])
    }

    // add local storage

    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(item));
    }, [item])


    return (
        <>
            <div className='main-div'>
                <div className="child-div">
                    <figure>
                        <figcaption><h1>MAKE YOUR TODO LIST</h1></figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text" placeholder='Enter Your Tasks...' className='form-control' value={Data} onChange={(eve) =>
                            setData(eve.target.value)} />

                        {togglebtn ? <i className="far fa-edit add-btn" onClick={additem}></i> : <i className="fa fa-plus add-btn" onClick={additem}></i>}
                    </div>
                    <div className="showItems">
                        {item.map((ele) => {
                            return (
                                <div className="eachItem" key={ele.id}>
                                    <h3>{ele.name}</h3>
                                    <div className="todo-btn">
                                        <i className="far fa-edit add-btn" onClick={() => edititem(ele.id)}></i>
                                        <i className="far fa-trash-alt add-btn" onClick={() => deletitem(ele.id)}></i>
                                    </div>
                                </div>

                            )

                        })}
                    </div>


                    <div className="showitems"><button className='btn effect04' data-sm-link-text="Remove All" onClick={removeall}>
                        <span>CHECK LIST</span></button></div>
                </div>

            </div>
        </>
    )
}

export default Todo