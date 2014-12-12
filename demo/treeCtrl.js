(function(angular) {
    'use strict';
    
    //// JavaScript Code ////
    function treeCtrl($log,$timeout,toaster) {
        var vm = this;
        var newId = 1;
        vm.ignoreChanges = false;
        vm.selected = null;
        vm.originalData = [
            { id : '1', parent : '#', text : 'Root', state: {'opened': true}, type: 'expanded' },
            { id : '2', parent : '1', text : 'Child_1', state: {'opened': true},  type: 'expanded' },
            { id : '3', parent : '2', text : 'Child_1_1', state: {'opened': true},  type: 'expanded'},
            { id : '4', parent : '3', text : 'Child_1_1_1', state: {'opened': true},   type: 'expanded'},
            { id : '5', parent : '3', text : 'Child_1_1_2', state: {'opened': true},   type: 'expanded'},
            { id : '6', parent : '5', text : 'Child_1_1_2_1', state: {'opened': true}, type: 'leaf'},
            { id : '7', parent : '5', text : 'Child_1_1_2_2', state: {'opened': true}, type: 'leaf'},
            { id : '8', parent : '5', text : 'Child_1_1_2_3', state: {'opened': true}, type: 'leaf'},
            { id : '9', parent : '5', text : 'Child_1_1_2_4', state: {'opened': true},type: 'leaf'},
            { id : '10', parent : '2', text : 'Child_1_2', state: {'opened': true}, type: 'expanded'},
            { id : '11', parent : '1', text : 'Child_2',  state: {'opened': true}, type: 'expanded'},
            ];
        vm.treeData = [];
        angular.copy(vm.originalData,vm.treeData);
        
        vm.treeConfig = {
            core : {
                multiple : false,
                animation: true,
                error : function(error) {
                    $log.error('treeCtrl: error from js tree - ' + angular.toJson(error));
                },
                check_callback : true,
                worker : true,
                expand_selected_onload: true
            },
            types : {
//                default : {
                expanded: {
//                    icon : 'glyphicon glyphicon-flash'
                    icon : "icons/expanded.png"
                },
//                star : {
                colapsed : {
//                    icon : 'glyphicon glyphicon-star'  
                    icon : "icons/colapsed.png"
                },
//                cloud : {
                leaf : {
//                    icon : 'glyphicon glyphicon-cloud'  
                    icon : "icons/leaf.png"
                }
            },
            version : 1,
            plugins : ['types', 'checkbox']
        };
        
        vm.changeNode = function() {      
                
              $timeout(function() {
            
                vm.selected = vm.treeInstance.jstree(true).get_selected(true);
                //alert(vm.selected[0].id+vm.selected[0].text);
                //alert(vm.treeData[0].state.'opened');// = false;
                //vm.ignoreChanges = !vm.ignoreChanges;
            });
        };
        
        vm.select_cb = function(node){
            vm.selected = vm.treeData[0];
            var n = [];
            n[0]=node;
             angular.copy(n, vm.selected);
        };   
        
        vm.reCreateTree = function() {
            vm.ignoreChanges = true;
            angular.copy(this.originalData,this.treeData);
            vm.treeConfig.version++;
        };
        /*
        vm.simulateAsyncData = function() {
            vm.promise = $timeout(function(){
                vm.treeData.push({ id : (newId++).toString(), parent : vm.treeData[0].id, text : 'Async Loaded' })
            },3000);
        };

        vm.addNewNode = function() {
            vm.treeData.push({ id : (newId++).toString(), parent : vm.newNode.parent, text : vm.newNode.text });
        };

        this.setNodeType = function() {
            var item = _.findWhere(this.treeData, { id : this.selectedNode } );
            item.type = this.newType;
            toaster.pop('success', 'Node Type Changed', 'Changed the type of node ' + this.selectedNode);
        };

        this.readyCB = function() {
            $timeout(function() {
                vm.ignoreChanges = false;
                toaster.pop('success', 'JS Tree Ready', 'Js Tree issued the ready event')
            });
        };

        this.createCB  = function(e,item) {
            $timeout(function() {toaster.pop('success', 'Node Added', 'Added new node with the text ' + item.node.text)});
        };

        this.applyModelChanges = function() {
            return !vm.ignoreChanges;
        };
        */
    }

    //// Angular Code ////

    angular.module('ngJsTreeDemo').controller('treeCtrl', treeCtrl);

})(angular);