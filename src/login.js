import React from 'react';


export class Login extends React.Component {
    constructor() {
        super();
        this.doLogin = this.doLogin.bind(this);
        this.handleReturn = this.handleReturn.bind(this);
    }

    /**
     * login öncesi bilgileri kontrol et geçerliyse login ol
     * check login credentials and do login
     */
    doLogin(){
        const userName = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        if (userName==='volkan' && password==='demo'){
            this.props.doLogin(userName);
        } else {
            alert('Kullanıcı adı veya şifre hatalı');
        }

    }

    handleReturn = (e) => { e.keyCode === 13 ? this.doLogin() : true }

    render() {
        return (
            <div className="content">
                <div className="img">
                    <a href="#" className="logo" alt="todo" title="todo"/>
                </div>
                <div className="login type1">
                    <div className="input-wrapper">
                        <i className="icon username" />
                        <input className="textbox" type="text"  name="username" id="username" placeholder="username or email" onKeyUp={this.handleReturn}/>
                    </div>
                    <div className="input-wrapper">
                        <i className="icon password" />
                        <input className="textbox" type="password" name="password" id="password" placeholder="password" onKeyUp={this.handleReturn} />
                    </div>
                </div>
                <div className="login-options">
                    <button type="button" className="login-btn" onClick={this.doLogin}>LOGIN</button>
                </div>
            </div>
        )
    }
}
