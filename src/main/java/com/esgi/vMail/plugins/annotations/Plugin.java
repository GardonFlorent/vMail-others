package com.esgi.vMail.plugins.annotations;

import com.esgi.vMail.plugins.PluginType;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Created by Linneya on 03/08/2016.
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface Plugin {
    PluginType type();
    String dependOn() default "";
    String registryName();
    String name() default "N/A";
    String author() default "N/A";
    String version() default "N/A";
    String creationDate() default "N/A";
}
