package com.project.ClinicFinal.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
	// @formatter:off
        http
            .authorizeRequests()
                .anyRequest().permitAll()
                .and()
            .csrf().disable();
    	// @formatter:on
    }

    @Bean
    @Override
    public UserDetailsService userDetailsService() {
	UserDetails user = User.withDefaultPasswordEncoder().username("ismita").password("password123").roles("USER")
		.build();
	return new InMemoryUserDetailsManager(user);
    }
}
