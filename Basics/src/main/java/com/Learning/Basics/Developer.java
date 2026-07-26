package com.Learning.Basics;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
@Component
public class Developer {
    @Autowired
    @Qualifier("laptop")
    private Computer comp;
    Laptop laptop;
    public void build(){
        System.out.println("Building something interesting using spring");
        comp.compile();
    }
}
