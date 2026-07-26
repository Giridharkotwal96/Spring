package com.Learning.Basics;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;
@Component
@Primary
public class Desktop implements Computer {
    public void compile(){
        System.out.println("In the loop of bugging and debugging quickly");
    }
}