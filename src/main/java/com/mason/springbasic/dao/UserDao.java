package com.mason.springbasic.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.mason.springbasic.pojo.UserPojo;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserDao extends BaseMapper<UserPojo> {
    
}
