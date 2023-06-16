package com.example.login.controller;

import com.example.login.entity.User;
import com.example.login.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class UserController {
    @Autowired
   public UserService userService;

    @RequestMapping("/toLogin")
    public String toLogin(){
        return "login";
    }
    @RequestMapping("/LoginSuccess")
    public String  LoginSuccess(Model model,User user){
        if(user.getUsername()!=null){
             model.addAttribute("kkk",user.getUsername());
            return "success";//我们就返回到我们的成功页面上边去
        }
        else {
            model.addAttribute("data","请输入你的密码");
            return "login";
        }

    }
    @RequestMapping("/toShow")
    public String showAll(Model model){
        model.addAttribute("users",userService.queryAll());
        return "showAll";

    }
    @RequestMapping("/toRegister")
    public String toRegister(){
        return "register";
    }

    @RequestMapping("/RegisterSuccess")
    public String RegisterSuccess(User user){

        int add = userService.add(user);
        return "login";

    }
    @RequestMapping("/toMessage")
    public String toMessage(Model model){
        model.addAttribute("users",userService.queryAll());
        return "showAll";
    }

}
