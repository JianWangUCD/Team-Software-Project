package org.fantasticsix.util;

import io.jsonwebtoken.Claims;
import org.fantasticsix.domain.User;

import static org.junit.jupiter.api.Assertions.*;

class JwtTokenUtilTest {

    @org.junit.jupiter.api.Test
    public void testGenerateToken() {
        User user = new User();
        user.setUsername("buyer");
        user.setRole("buyer");
        JwtTokenUtil jwtTokenUtil = new JwtTokenUtil();
        String token = jwtTokenUtil.generateToken(user);
        assertNotNull(token);
        // You can also perform further assertions on the generated token if needed.
    }


    @org.junit.jupiter.api.Test
    public void testValidateToken() {
        User user = new User();
        user.setUsername("buyer");
        user.setRole("buyer");
        JwtTokenUtil jwtTokenUtil = new JwtTokenUtil();
        String token = jwtTokenUtil.generateToken(user);
        System.out.println("Generated Token: " + token); // Print the token
//        System.out.println("Generated Token: " + token);
        assertTrue(jwtTokenUtil.validateToken(token));
        // You can also test with an invalid token to ensure it returns false.
    }

    @org.junit.jupiter.api.Test
    public void testParseJWT() throws Exception {
        JwtTokenUtil jwtTokenUtil = new JwtTokenUtil();
//        String token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJidXllciIsInJvbGUiOiJidXllciIsImlhdCI6MTY5MDY2OTU0MiwiZXhwIjoxNjkxNTMzNTQyfQ.a_e1_Qs0YbcJ3pGFIux5TaZPe2P3cus7YLgUFTHgAlp0n1gCDS5h8y8XGroUj9AlXf0kdlYpo_u7scTCBcoKGg";

        User user = new User();
        user.setUsername("buyer");
        user.setRole("buyer");

        String token = jwtTokenUtil.generateToken(user);

        // Perform assertions to check the parsed claims
        Claims claims = jwtTokenUtil.parseJWT(token);
        System.out.println(claims);
        assertNotNull(claims);
//        assertEquals("john_doe", claims.getSubject());
//        assertEquals("ROLE_USER", claims.get("role", String.class));
    }

    @org.junit.jupiter.api.Test
    void getRoleFromToken() {
    }

    @org.junit.jupiter.api.Test
    void parseJWT() {
    }
}