-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema ipdvdb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ipdvdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ipdvdb` DEFAULT CHARACTER SET utf8 ;
USE `ipdvdb` ;

-- -----------------------------------------------------
-- Table `ipdvdb`.`cargo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ipdvdb`.`cargo` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ipdvdb`.`departamento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ipdvdb`.`departamento` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ipdvdb`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ipdvdb`.`usuario` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NULL,
  `email` VARCHAR(100) NULL,
  `senha` VARCHAR(255) NULL,
  `cargo_id` INT UNSIGNED NOT NULL,
  `departamento_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_usuario_cargo1_idx` (`cargo_id` ASC),
  INDEX `fk_usuario_departamento1_idx` (`departamento_id` ASC),
  CONSTRAINT `fk_usuario_cargo1`
    FOREIGN KEY (`cargo_id`)
    REFERENCES `ipdvdb`.`cargo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_departamento1`
    FOREIGN KEY (`departamento_id`)
    REFERENCES `ipdvdb`.`departamento` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ipdvdb`.`centro_custo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ipdvdb`.`centro_custo` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ipdvdb`.`depto_centro_custo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ipdvdb`.`depto_centro_custo` (
  `departamento_id` INT UNSIGNED NOT NULL,
  `centro_custo_id` INT UNSIGNED NOT NULL,
  INDEX `fk_depto_centro_custo_departamento1_idx` (`departamento_id` ASC),
  INDEX `fk_depto_centro_custo_centro_custo1_idx` (`centro_custo_id` ASC),
  CONSTRAINT `fk_depto_centro_custo_departamento1`
    FOREIGN KEY (`departamento_id`)
    REFERENCES `ipdvdb`.`departamento` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_depto_centro_custo_centro_custo1`
    FOREIGN KEY (`centro_custo_id`)
    REFERENCES `ipdvdb`.`centro_custo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
