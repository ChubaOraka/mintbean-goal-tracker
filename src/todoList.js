import React from 'react';
import './todoList.css'

export class TodoList extends React.Component{
    constructor(){
        super();
        this.remove = this.remove.bind(this);
        this.done = this.done.bind(this);
        this.changeList = this.changeList.bind(this);
        this.editTodoItem = this.editTodoItem.bind(this);
        this.updateTodoItem = this.updateTodoItem.bind(this);
        this.handleKeys = this.handleKeys.bind(this);
        this.state = {activeList:'All', isTaskTitleEditable: false, itemKey: ''};
    }

    /**
     * task silmek için controller method
     * controller method for removing task
     * @param e
     */
    remove(e){
        this.props.removeTask(e.target.parentNode.id);
    }


    /**
     * task statüsünü güncellemek için controller method
     * controller method for changing the task status
     * @param e
     */
    done(e){
        this.props.doneTask(e.target.parentNode.id);
    }

    /**
     * Tümü, aktif yada tamamlanmış olanları listeler
     * Toggle list All, Active or done
     * @param e
     */
    changeList(e){
        var listChanger = document.getElementById('listChanger');
        var li = listChanger.querySelectorAll('li');
        for (let i=0; i<li.length; i++){
            li[i].classList.remove('active');
        }
        var activeLi = e.target.parentNode;
        activeLi.classList.add('active');
        this.setState({activeList : activeLi.innerText});
    }

    /**
     * This function allows you to edit the todo item
     * @param e
     */
    editTodoItem(e, item){
        e.persist()
        if (e.target.parentNode.classList.contains("passive")) {
            e.target.contentEditable = true
            this.setState({isTaskTitleEditable: e.target.contentEditable, itemKey: e.target.parentNode.id})
            e.target.focus()
        }
    }

    /**
     * This function updates the todo item
     * @param e
     */
    updateTodoItem(e){
        e.persist()
        e.target.contentEditable = false
        this.props.updateTask(e.target.innerText, e.target.parentNode.id)
        this.setState({isTaskTitleEditable: false, itemKey: ''})
    }

    /**
     * This function updates the todo item
     * @param e
     */
    handleKeys(e){
        e.persist()
        console.log("Event key: ", e.key, "\nEvent code: ", e.code, "\nEvent: ", e)
        if (e.key === "Enter")
            this.updateTodoItem(e)
        if (e.key === "Escape"){
            e.target.innerText = this.props.myList[e.target.parentNode.id.replace('task_', '')].text
            e.target.contentEditable = false
            this.setState({isTaskTitleEditable: e.target.contentEditable, itemKey: e.target.parentNode.id})
        }
    }

    render(){
        let items_left = 0;
        const items = this.props.myList.map((elem,i) =>{
            let task_id = 'task_'+i;
            if (
                this.state.activeList==='All' ||
                (this.state.activeList==='Active' && elem.status==='passive') ||
                (this.state.activeList==='Completed' && elem.status==='active')
            ){
                if (elem.status==='passive'){items_left++;}
                return(
                    <li key={i} id={task_id} 
                        className={`${elem.status} ${ (this.state.isTaskTitleEditable && task_id === this.state.itemKey) ? '' : 'noselect'}`.trim()} 
                        title="Double click to edit">
                        <span className="id">{i+1}</span>
                        <span className="title" onDoubleClick={this.editTodoItem} onBlur={this.updateTodoItem}
                            onKeyDown={this.handleKeys}>
                            {elem.text}
                        </span>
                        <span className="type" onClick={this.done} />
                        <span className="delete" onClick={this.remove}></span>
                    </li>

                )
            }
        });
        return(
            <div>
                <div className="todo-list type1">
                    <ul>
                        {items}
                    </ul>
                </div>
                <div className="todo-filter type1">
                    <div className="left">
                        <span><b>{items_left}</b> items left</span>
                    </div>
                    <div className="right" id="listChanger">
                        <ul>
                            <li className="active" onClick={this.changeList}><span>All</span></li>
                            <li><span onClick={this.changeList}>Active</span></li>
                            <li><span onClick={this.changeList}>Completed</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}