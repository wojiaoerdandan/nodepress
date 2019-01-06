/**
 * Category controller.
 * @file 分类模块控制器
 * @module module/category/controller
 * @author Surmon <https://github.com/surmon-china>
 */

import { PaginateResult } from 'mongoose';
import { Controller, Get, Put, Post, Delete, Body, UseGuards } from '@nestjs/common';
import { HumanizedJwtAuthGuard } from '@app/guards/humanized-auth.guard';
import { HttpProcessor } from '@app/decorators/http.decorator';
import { QueryParams } from '@app/decorators/query-params.decorator';
import { JwtAuthGuard } from '@app/guards/auth.guard';
import { Category, DelCategories } from './category.model';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @UseGuards(HumanizedJwtAuthGuard)
  @HttpProcessor.paginate()
  @HttpProcessor.handle('获取分类列表')
  getCategories(@QueryParams() { querys, options, isAuthenticated }): Promise<PaginateResult<Category>> {
    return this.categoryService.getList(querys, options, isAuthenticated);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpProcessor.handle('添加分类')
  createCategory(@Body() category: Category): Promise<Category> {
    return this.categoryService.create(category);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @HttpProcessor.handle('批量删除分类')
  delCategories(@Body() body: DelCategories): Promise<any> {
    return this.categoryService.batchDelete(body.categories);
  }

  @Get(':id')
  @HttpProcessor.handle('获取单个分类')
  getCategory(@QueryParams() { params }): Promise<Category[]> {
    return this.categoryService.getGenealogyById(params.id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @HttpProcessor.handle('修改单个分类')
  putCategory(@QueryParams() { params }, @Body() category: Category): Promise<Category> {
    return this.categoryService.update(params.id, category);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpProcessor.handle('删除单个分类')
  delCategory(@QueryParams() { params }): Promise<Category> {
    return this.categoryService.delete(params.id);
  }
}
