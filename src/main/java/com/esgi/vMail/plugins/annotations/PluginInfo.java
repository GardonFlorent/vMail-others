package com.esgi.vMail.plugins.annotations;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Created by Linneya on 03/08/2016.
 */
@Target(ElementType.PACKAGE)
@Retention(RetentionPolicy.RUNTIME)
public @interface PluginInfo {
    String registryName();
    String name() default "N/A";
    String author() default "N/A";
    String version() default "N/A";
}
