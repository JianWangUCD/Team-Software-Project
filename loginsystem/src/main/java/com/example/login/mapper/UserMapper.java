package com.example.login.mapper;

import com.example.login.entity.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;


@Mapper
public interface UserMapper {
    @Insert("INSERT INTO spring VALUES(#{username},#{password})")
    int add(User user);
    @Select("SELECT * FROM spring")
    List<User> queryAll();
}
