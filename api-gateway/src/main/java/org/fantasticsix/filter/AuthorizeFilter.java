package org.fantasticsix.filter;

import io.jsonwebtoken.Claims;
import org.fantasticsix.util.JwtTokenUtil;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class AuthorizeFilter implements GlobalFilter, Ordered {

    //令牌头名字
    private static final String AUTHORIZE_TOKEN = "Authorization";

    /***
     * 全局过滤器
     * @param exchange
     * @param chain
     * @return
     */
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        //获取Request、Response对象
        ServerHttpRequest request = exchange.getRequest();
        ServerHttpResponse response = exchange.getResponse();

        //获取请求的URI
        String path = request.getURI().getPath();

        //如果是登录/注册，直接放行
        if (path.startsWith("/user-service/register") || path.startsWith("/user-service/login")|| path.startsWith("/product-service/flashsale/products")) {
            //放行
            Mono<Void> filter = chain.filter(exchange);
            return filter;
        }

        //获取头文件中的令牌信息
        String tokent = request.getHeaders().getFirst(AUTHORIZE_TOKEN);

        //如果头文件中没有，则从请求参数中获取
        if (StringUtils.isEmpty(tokent)) {
            tokent = request.getQueryParams().getFirst(AUTHORIZE_TOKEN);
        }

        //如果为空，则输出错误代码
        if (StringUtils.isEmpty(tokent)) {
            //设置方法不允许被访问，405错误代码
            response.setStatusCode(HttpStatus.METHOD_NOT_ALLOWED);
            return response.setComplete();
        }

        //解析令牌数据
        try {
            tokent = tokent.substring("Bearer ".length());
            Claims claims = JwtTokenUtil.parseJWT(tokent);

            String role = JwtTokenUtil.getRoleFromToken(tokent);
            if(role.equals("admin")){ //如果是admin，不受限制
                Mono<Void> filter = chain.filter(exchange);
                return filter;
            }
            else if(role.equals("buyer") && (path.startsWith("/order-service/flashsale/checkout") ||
                    path.startsWith("/order-service/flashsale/stock-check") ||
                    path.startsWith("/order-service/flashsale/user"))){
                Mono<Void> filter = chain.filter(exchange);
                return filter;
            }
            else if(role.equals("seller") && path.startsWith("/product-service/seller")){
                Mono<Void> filter = chain.filter(exchange);
                return filter;
            }
        } catch (Exception e) {
            e.printStackTrace();
            //解析失败，响应401错误
            response.setStatusCode(HttpStatus.UNAUTHORIZED);
            return response.setComplete();
        }

        response.setStatusCode(HttpStatus.UNAUTHORIZED);
        return response.setComplete();

//        //放行
//        return chain.filter(exchange);
    }


    /***
     * 过滤器执行顺序
     * @return
     */
    @Override
    public int getOrder() {
        return 0;
    }
}