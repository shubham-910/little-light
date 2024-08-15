package com.example.Little_Light.security;

import com.example.Little_Light.entities.Role;
import com.example.Little_Light.entities.Therapist;
import com.example.Little_Light.entities.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JWTConfig {

    @Value("${jwt.secret}")
    private String secretKey;
    @Value("${jwt.jwtExpiration}")
    private long jwtExpiration;
    @Value("${jwt.refreshExpiration}")
    private long refreshExpiration;

    public String generateToken(User userDetails){
        return generateToken(new HashMap<>(), userDetails);
    }
    private String generateToken(Map<String, Object> extraClaims, User userDetails){
        return buildToken(extraClaims, userDetails, jwtExpiration);
    }
    public String generateRefreshToken(User userDetails){
        return buildToken(new HashMap<>(), userDetails, refreshExpiration);
    }

    public String generateToken(Therapist userDetails){
        return generateToken(new HashMap<>(), userDetails);
    }
    private String generateToken(Map<String, Object> extraClaims, Therapist userDetails){
        return buildToken(extraClaims, userDetails, jwtExpiration);
    }
    public String generateRefreshToken(Therapist userDetails){
        return buildToken(new HashMap<>(), userDetails, refreshExpiration);
    }
    public String extractUsername(String token){
        return extractClaim(token, Claims::getSubject);
    }
    public boolean isTokenExpired(String token){
        return extractExpiration(token).before(new Date());
    }
    private Date extractExpiration(String token){
        return extractClaim(token, Claims::getExpiration);
    }
    public boolean isTokenValid(String token, UserDetails userDetails){
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
    private String buildToken(Map<String, Object> extraClaims, User userDetails, long expiration){
        extraClaims.put("userId", userDetails.getUserId());
        extraClaims.put("email", userDetails.getEmail());
        extraClaims.put("role", userDetails.getRole());
        extraClaims.put("firstName", userDetails.getFirstName());
        extraClaims.put("lastName", userDetails.getLastName());
        extraClaims.put("username", userDetails.getUsername());
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }
    private String buildToken(Map<String, Object> extraClaims, Therapist userDetails, long expiration){
        extraClaims.put("userId", userDetails.getTherapistId());
        extraClaims.put("email", userDetails.getEmail());
        extraClaims.put("role", userDetails.getRole());
        extraClaims.put("firstName", userDetails.getFirstName());
        extraClaims.put("lastName", userDetails.getLastName());
        extraClaims.put("username", userDetails.getUsername());
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }
    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver){
        Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    private Claims extractAllClaims(String token){
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public Integer extractID(String token) {
        Claims claims = extractAllClaims(token);
        return (Integer) claims.get("userId");
    }

    public String extractEmail(String token) {
        Claims claims = extractAllClaims(token);
        return (String) claims.get("email");
    }

    public String extractRole(String token) {
        Claims claims = extractAllClaims(token);
        return (String) claims.get("role");
    }

    public String extractFirstName(String token) {
        Claims claims = extractAllClaims(token);
        return (String) claims.get("firstName");
    }

    public String extractLastName(String token) {
        Claims claims = extractAllClaims(token);
        return (String) claims.get("lastName");
    }
}
