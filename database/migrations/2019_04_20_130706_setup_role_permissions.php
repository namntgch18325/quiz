<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use App\Laravue\Models\Role;
use App\Laravue\Models\Permission;
use App\Laravue\Acl;

class SetupRolePermissions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        foreach (Acl::roles() as $role) {
            Role::findOrCreate($role);
        }

        $adminRole = Role::findByName(Acl::ROLE_ADMIN);
        $managerRole = Role::findByName(Acl::ROLE_MANAGER);
        $userRole = Role::findByName(Acl::ROLE_USER);

        foreach (Acl::permissions() as $permission) {
            Permission::findOrCreate($permission, 'api');
        }

        // Setup basic permission
        $adminRole->givePermissionTo(Acl::permissions());
        $managerRole->givePermissionTo(Acl::permissions([
            Acl::PERMISSION_VIEW_MENU_MANAGE_SURVEY,
            Acl::PERMISSION_VIEW_MENU_MANAGE_QUIZZ,
            Acl::PERMISSION_VIEW_MENU_MANAGE_CLASS,
            Acl::PERMISSION_VIEW_MENU_MANAGE_DEPARTMENT,
            Acl::PERMISSION_VIEW_MENU_MANAGE_CLASS,
            Acl::PERMISSION_VIEW_MENU_MANAGE_TAG,
            Acl::PERMISSION_VIEW_MENU_MANAGE_ROLE,
            Acl::PERMISSION_VIEW_MENU_MANAGE_MEDIA,
            // add role view menu of app for manager role
            // now add permission to manage quizz and survey for manager
            Acl::PERMISSION_CREATE_QUIZZ,
            Acl::PERMISSION_EDIT_QUIZZ,
            Acl::PERMISSION_SOFT_DELETE_QUIZZ,

            Acl::PERMISSION_CREATE_SURVEY_LIST,
            Acl::PERMISSION_EDIT_SURVEY_LIST,
            Acl::PERMISSION_SOFT_DELETE_SURVEY_LIST,

            Acl::PERMISSION_CREATE_CLASS,
            Acl::PERMISSION_EDIT_CLASS,
            Acl::PERMISSION_SOFT_DELETE_CLASS,
            
            Acl::PERMISSION_CREATE_DEPARTMENT,
            Acl::PERMISSION_EDIT_DEPARTMENT,
            Acl::PERMISSION_SOFT_DELETE_DEPARTMENT
            ]));
        $userRole->givePermissionTo([
            Acl::PERMISSION_USER_VIEW_MENU_SURVEY,
            Acl::PERMISSION_USER_VIEW_MENU_ANSWER_SURVEY
        ]);

        foreach (Acl::roles() as $role) {
            /** @var \App\User[] $users */
            $users = \App\Laravue\Models\User::where('role', $role)->get();
            $role = Role::findByName($role);
            foreach ($users as $user) {
                $user->syncRoles($role);
            }
        }

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('role');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (!Schema::hasColumn('users', 'role')) {
            Schema::table('users', function (Blueprint $table) {
                $table->string('role')->default('user');
            });
        }

        /** @var \App\User[] $users */
        $users = \App\Laravue\Models\User::all();
        foreach ($users as $user) {
            $roles = array_reverse(Acl::roles());
            foreach ($roles as $role) {
                if ($user->hasRole($role)) {
                    $user->role = $role;
                    $user->save();
                }
            }
        }
    }
}
