import {firstCode} from './tool'

export const myMixin = {
    data () {
        return {
            firstCode: ''
        }
    },
    mounted() {
        this.getFirstCode();
    },
    methods: {
        
        getFirstCode() {
            let contacts_name = this.$refs.contacts_name.innerHTML;
            this.firstCode = firstCode(contacts_name);
        }
    },
}

