//package com.menuitem.models;
//
//import java.lang.annotation.Documented;
//import java.lang.annotation.ElementType;
//import java.lang.annotation.Retention;
//import java.lang.annotation.RetentionPolicy;
//import java.lang.annotation.Target;
//
//import javax.validation.Constraint;
//import javax.validation.Payload;
//
//@Documented
//@Retention(RetentionPolicy.RUNTIME)
//@Target({ElementType.FIELD, ElementType.ANNOTATION_TYPE, ElementType.PARAMETER})
//@Constraint(validatedBy = AdultValidator.class)
//public @interface UserIdExist {
//    String message() default "{adult}";
//    Class<?>[] groups() default { };
//    Class<? extends Payload>[] payload() default { };
//}