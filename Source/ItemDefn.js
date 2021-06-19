"use strict";
class ItemDefn2 {
    constructor(name, projectileBuild) {
        this.name = name;
        this.projectileBuild = projectileBuild;
    }
    static Instances() {
        if (ItemDefn2._instances == null) {
            ItemDefn2._instances = new ItemDefn2_Instances();
        }
        return ItemDefn2._instances;
    }
}
class ItemDefn2_Instances {
    constructor() {
        this.Shell = new ItemDefn2("Shell", (color, pos, vel) => new Projectile(color, pos, vel, 20));
        this.ShellLarge = new ItemDefn2("ShellLarge", (color, pos, vel) => new Projectile(color, pos, vel, 50));
        this.Slug = new ItemDefn2("Slug", (color, pos, vel) => new Projectile(color, pos, vel, 2));
        this._All =
            [
                this.Shell,
                this.ShellLarge,
                this.Slug
            ];
        this._AllByName = ArrayHelper.addLookupsByName(this._All);
    }
}
