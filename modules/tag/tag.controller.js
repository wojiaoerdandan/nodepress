"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagController = void 0;
const lodash_1 = __importDefault(require("lodash"));
const common_1 = require("@nestjs/common");
const admin_only_guard_1 = require("../../guards/admin-only.guard");
const admin_maybe_guard_1 = require("../../guards/admin-maybe.guard");
const permission_pipe_1 = require("../../pipes/permission.pipe");
const expose_pipe_1 = require("../../pipes/expose.pipe");
const responsor_decorator_1 = require("../../decorators/responsor.decorator");
const queryparams_decorator_1 = require("../../decorators/queryparams.decorator");
const tag_dto_1 = require("./tag.dto");
const tag_service_1 = require("./tag.service");
const tag_model_1 = require("./tag.model");
let TagController = class TagController {
    constructor(tagService) {
        this.tagService = tagService;
    }
    getTags(query, { isUnauthenticated }) {
        const { sort, page, per_page } = query, filters = __rest(query, ["sort", "page", "per_page"]);
        const paginateQuery = {};
        const paginateOptions = { page, perPage: per_page, dateSort: sort };
        if (filters.keyword) {
            const trimmed = lodash_1.default.trim(filters.keyword);
            const keywordRegExp = new RegExp(trimmed, 'i');
            paginateQuery.$or = [{ name: keywordRegExp }, { slug: keywordRegExp }, { description: keywordRegExp }];
        }
        return this.tagService.paginater(paginateQuery, paginateOptions, isUnauthenticated);
    }
    getAllTags() {
        return this.tagService.getAllTagsCache();
    }
    createTag(tag) {
        return this.tagService.create(tag);
    }
    delTags(body) {
        return this.tagService.batchDelete(body.tag_ids);
    }
    putTag({ params }, tag) {
        return this.tagService.update(params.id, tag);
    }
    delTag({ params }) {
        return this.tagService.delete(params.id);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(admin_maybe_guard_1.AdminMaybeGuard),
    responsor_decorator_1.Responsor.paginate(),
    responsor_decorator_1.Responsor.handle('Get tags'),
    __param(0, (0, common_1.Query)(permission_pipe_1.PermissionPipe, expose_pipe_1.ExposePipe)),
    __param(1, (0, queryparams_decorator_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tag_dto_1.TagPaginateQueryDTO, Object]),
    __metadata("design:returntype", Promise)
], TagController.prototype, "getTags", null);
__decorate([
    (0, common_1.Get)('all'),
    responsor_decorator_1.Responsor.handle('Get all tags'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TagController.prototype, "getAllTags", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(admin_only_guard_1.AdminOnlyGuard),
    responsor_decorator_1.Responsor.handle('Create tag'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tag_model_1.Tag]),
    __metadata("design:returntype", Promise)
], TagController.prototype, "createTag", null);
__decorate([
    (0, common_1.Delete)(),
    (0, common_1.UseGuards)(admin_only_guard_1.AdminOnlyGuard),
    responsor_decorator_1.Responsor.handle('Delete tags'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tag_dto_1.TagsDTO]),
    __metadata("design:returntype", void 0)
], TagController.prototype, "delTags", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(admin_only_guard_1.AdminOnlyGuard),
    responsor_decorator_1.Responsor.handle('Update Tag'),
    __param(0, (0, queryparams_decorator_1.QueryParams)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, tag_model_1.Tag]),
    __metadata("design:returntype", Promise)
], TagController.prototype, "putTag", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(admin_only_guard_1.AdminOnlyGuard),
    responsor_decorator_1.Responsor.handle('Delete tag'),
    __param(0, (0, queryparams_decorator_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TagController.prototype, "delTag", null);
TagController = __decorate([
    (0, common_1.Controller)('tag'),
    __metadata("design:paramtypes", [tag_service_1.TagService])
], TagController);
exports.TagController = TagController;
//# sourceMappingURL=tag.controller.js.map