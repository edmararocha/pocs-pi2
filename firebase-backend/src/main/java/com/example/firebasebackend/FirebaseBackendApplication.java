package com.example.firebasebackend;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;

@SpringBootApplication
@RestController
public class FirebaseBackendApplication {

    @PostConstruct
    public void init() throws Exception {
        FileInputStream serviceAccount = new FileInputStream("serviceAccountKey.json");

        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();

        if (FirebaseApp.getApps().isEmpty()) {
            FirebaseApp.initializeApp(options);
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/api/protected")
    public String protectedEndpoint(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return "Token não enviado ou inválido";
            }
            String idToken = authHeader.substring(7);
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
            String uid = decodedToken.getUid();

            return "Usuário autenticado com UID: " + uid;
        } catch (Exception e) {
            return "Token inválido: " + e.getMessage();
        }
    }

    public static void main(String[] args) {
        SpringApplication.run(FirebaseBackendApplication.class, args);
    }
}
