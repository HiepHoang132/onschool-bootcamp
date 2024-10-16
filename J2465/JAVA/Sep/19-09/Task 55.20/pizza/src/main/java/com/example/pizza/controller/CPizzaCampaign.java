package com.example.pizza.controller;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CPizzaCampaign {

    @CrossOrigin
    @GetMapping("/devcamp-simple")
    public String simple() {
        return "test campaign";
    }

    @CrossOrigin
    @GetMapping("/devcamp-date")
    public String getDateViet() {
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("EEEE").localizedBy(Locale.forLanguageTag("vi"));
        LocalDate today = LocalDate.now(ZoneId.systemDefault());

        return String.format("Hello pizza lover! Hôm nay %s, mua 1 tặng 1.", dtf.format(today));
    }

}