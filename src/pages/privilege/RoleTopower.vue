<template>
	<div class="role">
		<div class="crumbs">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item>
					<!-- <i class="el-icon-lx-people"></i> -->
					{{ $t('common.actMant') }}
				</el-breadcrumb-item>
				<el-breadcrumb-item>
					<!-- <i class="el-icon-lx-people"></i> -->
					{{ $t('common.roleMant') }}
				</el-breadcrumb-item>
				<el-breadcrumb-item>
					<!-- <i class="el-icon-lx-people"></i> -->
					{{ $t('common.rolePower') }}
				</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="pulls-right">
				<el-button @click="$router.go(-1)">{{ $t('common.return') }}</el-button>
			</div>
		</div>
		<div class="container">
			<h3>
				{{ $t('common.roledoStr') }}
				<div class="fr">
					<el-button type="primary" :icon="!isexpand ? 'el-icon-lx-add' : 'el-icon-lx-move'" @click="toggleExpands">{{
						!isexpand ? $t('common.expandAll') : $t('common.collapseAll')
					}}</el-button>
				</div>
				<div class="clearboth"></div>
			</h3>
			<!-- <div class="handle-box mgb20">
				<div class="formdiv" v-for="(item,i) in tableData" :key="i" v-show="item.children">
                    <div class="left"> <el-checkbox v-model="item.isChecked">{{item.name}}</el-checkbox></div>
                    <div class="right" v-for="(ite,s) in item.children" :key="s">
                        <el-checkbox v-model="ite.isChecked">{{ite.name}}{{ite.isChecked}}</el-checkbox>
                    </div>
                </div>
                <div class="clearboth"></div>
			</div> -->
			<div class="handle-box">
				<!-- :default-expanded-keys="[2, 3]" check-strictly:子级选中 父级亦选中 -->
				<el-tree
					ref="tree"
					:data="tableData"
					show-checkbox
                    check-strictly
					node-key="id"
					:default-expanded-keys="expandedArr"
					:default-checked-keys="checkedArr"
					@check-change="handleCheckChange"
					:props="defaultProps"
					@check="clickDeal"
				>
				</el-tree>
			</div>
			<div class="text-center">
				<el-button type="primary" @click="handleSubmit">{{ $t('common.ok') }}</el-button>
				<el-button @click="resets">{{ $t('common.reset') }}</el-button>
			</div>
		</div>
	</div>
</template>

<script>
import { getMenuList } from '@/api/auth';
import { getPower, getRolePerm } from '@/api/pvivilege';
export default {
	data() {
		return {
			defaultProps: {
				children: 'children',
				label: 'name' //lable => name
			},
			// checked: true,
			expandedArr: [],
			tableData: [],
			checkedArr: [],
			isexpand: false,
			id: this.$route.query.id
		};
	},
	created() {
		this.getData();
	},
	methods: {
		getData(status) {
			getMenuList().then(res => {
				if (res.success) {
					console.log(res, 'res');
					this.tableData = res.data;
					getRolePerm({ id: this.id * 1 }).then(res => {
						if (res.success) {
							this.checkedArr = res.data || [];
							this.$refs.tree.setCheckedKeys(this.checkedArr);
							if (status === 2) {
								this.$message.success(this.$t('common.success'));
							}
						} else {
							this.$message.error(res.message);
						}
					});
					// todo 循环CheckBox 赋值
					// this.tableData.map(v=>{
					//     v.isChecked = false
					//     if(v.children){
					//         v.children.map(v2 => {
					//             v2.isChecked=false;
					//         })
					//     }
					// })
					// console.log(this.tableData,'this.tableData')
				} else {
					this.$message.error(res.message);
				}
			});
		},
		handleCheckChange(data, checked, indeterminate) {
			console.log(data, checked, indeterminate);
		},
		// 清空
		// resetChecked() {
		//     this.$refs.tree.setCheckedKeys([]);
		// },
		handleSubmit() {
			console.log(this.$refs.tree.getCheckedKeys(), 'keysss');
			// 将获取到的勾选的数据id上传
			let post = {
				id: this.id*1,
				menuIds: this.$refs.tree.getCheckedKeys().join(',')
			};
			getPower(post).then(res => {
				if (res.success) {
					this.$message.success(this.$t('common.success'));
					this.getData();
				} else {
					this.$message.error(res.message);
				}
			});
		},
		// 重置
		resets() {
			// 重新获取数据，重新渲染
			this.getData(2);
		},
		toggleExpands() {
			this.isexpand = !this.isexpand;
			for (var i = 0; i < this.$refs.tree.store._getAllNodes().length; i++) {
				this.$refs.tree.store._getAllNodes()[i].expanded = this.isexpand;
			}
		},

		clickDeal(currentObj, treeStatus) {
			// 用于：父子节点严格互不关联时，父节点勾选变化时通知子节点同步变化，实现单向关联。
			let selected = treeStatus.checkedKeys.indexOf(currentObj.id); // -1未选中
			// 选中
			if (selected !== -1) {
				// 子节点只要被选中父节点就被选中
				this.selectedParent(currentObj);
				// 统一处理子节点为相同的勾选状态
				this.uniteChildSame(currentObj, true);
			} else {
				// 未选中 处理子节点全部未选中
				if (currentObj.children&&currentObj.children.length !== 0) {
					this.uniteChildSame(currentObj, false);
				}
			}
		},
		uniteChildSame(treeList, isSelected) {
			this.$refs.tree.setChecked(treeList.id, isSelected);
			if (treeList.children) {
				for (let i = 0; i < treeList.children.length; i++) {
					this.uniteChildSame(treeList.children[i], isSelected);
				}
			}
		},
		// 统一处理父节点为选中
		selectedParent(currentObj) {
			let currentNode = this.$refs.tree.getNode(currentObj);
			if (currentNode.parent.key !== undefined) {
				this.$refs.tree.setChecked(currentNode.parent, true);
				this.selectedParent(currentNode.parent);
			}
		}
	}
};
</script>
<style lang="scss" scoped>
	.handle-box {
		border-left: 1px solid #ebeef5;
		border-top: 1px solid #ebeef5;
		display: block;
	}
	.container {
		h3 {
			margin-bottom: 15px;
			font-weight: 400;
		}
	}
	.formdiv {
		float: left;
		height: 40px;
		width: 50%;
		display: flex;
		div {
			border-right: 1px solid #ebeef5;
			border-bottom: 1px solid #ebeef5;
			text-align: center;
			line-height: 40px;
		}
		.left {
			width: 20%;
			background-color: #f5f7fa !important;
		}
		.right {
			flex: 1;
		}
	}
</style>
