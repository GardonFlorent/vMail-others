package com.esgi.vMail.plugins.annotations;

import com.esgi.vMail.plugins.OptionPurpose;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Created by Linneya on 09/08/2016.
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface PluginOption {
    OptionPurpose aimTo();
}
