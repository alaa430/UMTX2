const OFFSET_wk_vtable_first_element     = 0x00269EA0;
const OFFSET_wk_memset_import            = 0x028D4DB0;
const OFFSET_wk___stack_chk_guard_import = 0x028D4A90;

const OFFSET_lk___stack_chk_guard        = 0x0006D1D0;
const OFFSET_lk_pthread_create_name_np   = 0x00001C40;
const OFFSET_lk_pthread_join             = 0x000310A0;
const OFFSET_lk_pthread_exit             = 0x00021560;
const OFFSET_lk__thread_list             = 0x00064208;
const OFFSET_lk_sleep                    = 0x00024920;
const OFFSET_lk_sceKernelGetCurrentCpu   = 0x00002770;

const OFFSET_lc_memset                   = 0x00014D70;
const OFFSET_lc_setjmp                   = 0x0005B420;
const OFFSET_lc_longjmp                  = 0x0005B470;

const OFFSET_WORKER_STACK_OFFSET         = 0x0007FB88;

let wk_gadgetmap = {
	"ret":              0x00000042,
	"pop rdi":          0x000A9C2E,
	"pop rsi":          0x000463BC,
	"pop rdx":          0x000F3581,
	"pop rcx":          0x0005F233,
	"pop r8":           0x00F5193F,
	"pop r9":           0x00142126,
	"pop rax":          0x000091CA,
	"pop rsp":          0x0007B3E7,

	"mov [rdi], rsi":   0x0036C890,
	"mov [rdi], rax":   0x000D2B47,
	"mov [rdi], eax":   0x000004D4,

	"infloop":          0x00009251,

    "shl rax, 4":       0x013AB936,

    //branching specific gadgets
	"cmp [rcx], eax":   0x00691182,
	"sete al":          0x0001C273,
	"seta al":          0x001F332A,
	"setb al":          0x00041191,
	"setg al":          0x001F335E,
	"setl al":          0x007C18CC,
	"shl rax, 3":       0x019B0C13,
    "add rax, rcx":     0x000DA38E,
	"mov rax, [rax]":   0x000B474C,
	"inc dword [rax]":  0x00044C0A,
};

let syscall_map = {
	0x001: 0x00034E8A, // sys_exit
	0x002: 0x00036830, // sys_fork
	0x003: 0x00034A50, // sys_read
	0x004: 0x000349B0, // sys_write
	0x005: 0x00035050, // sys_open
	0x006: 0x00035680, // sys_close
	0x007: 0x00034270, // sys_wait4
	0x00A: 0x00036370, // sys_unlink
	0x00C: 0x00035D00, // sys_chdir
	0x00F: 0x00035700, // sys_chmod
	0x014: 0x00034BD0, // sys_getpid
	0x017: 0x000346D0, // sys_setuid
	0x018: 0x00035CE0, // sys_getuid
	0x019: 0x00035090, // sys_geteuid
	0x01B: 0x00035130, // sys_recvmsg
	0x01C: 0x00035360, // sys_sendmsg
	0x01D: 0x00035EB0, // sys_recvfrom
	0x01E: 0x000345D0, // sys_accept
	0x01F: 0x000343F0, // sys_getpeername
	0x020: 0x00036510, // sys_getsockname
	0x021: 0x00036030, // sys_access
	0x022: 0x000361B0, // sys_chflags
	0x023: 0x00035B80, // sys_fchflags
	0x024: 0x00036A60, // sys_sync
	0x025: 0x00035030, // sys_kill
	0x027: 0x00034AD0, // sys_getppid
	0x029: 0x00036090, // sys_dup
	0x02A: 0x00034A20, // sys_compat10.pipe
	0x02B: 0x000366D0, // sys_getegid
	0x02C: 0x00036A20, // sys_profil
	0x02F: 0x00034570, // sys_getgid
	0x031: 0x00034550, // sys_getlogin
	0x032: 0x00035DE0, // sys_setlogin
	0x035: 0x00034790, // sys_sigaltstack
	0x036: 0x000348F0, // sys_ioctl
	0x037: 0x00035BC0, // sys_reboot
	0x038: 0x00035AC0, // sys_revoke
	0x03B: 0x0003531D, // sys_execve
	0x041: 0x00035760, // sys_msync
	0x049: 0x00034F50, // sys_munmap
	0x04A: 0x00035CC0, // sys_mprotect
	0x04B: 0x00034E40, // sys_madvise
	0x04E: 0x00035010, // sys_mincore
	0x04F: 0x000344D0, // sys_getgroups
	0x050: 0x00034A70, // sys_setgroups
	0x053: 0x000344B0, // sys_setitimer
	0x056: 0x000342D0, // sys_getitimer
	0x059: 0x00035B20, // sys_getdtablesize
	0x05A: 0x00035F30, // sys_dup2
	0x05C: 0x00035560, // sys_fcntl
	0x05D: 0x000350B0, // sys_select
	0x05F: 0x00034510, // sys_fsync
	0x060: 0x00035440, // sys_setpriority
	0x061: 0x00034C90, // sys_socket
	0x062: 0x00035D20, // sys_connect
	0x063: 0x00036690, // sys_netcontrol
	0x064: 0x00034290, // sys_getpriority
	0x065: 0x000362B0, // sys_netabort
	0x066: 0x00036630, // sys_netgetsockinfo
	0x068: 0x00036330, // sys_bind
	0x069: 0x000355A0, // sys_setsockopt
	0x06A: 0x00034890, // sys_listen
	0x071: 0x000358A0, // sys_socketex
	0x072: 0x00035270, // sys_socketclose
	0x074: 0x00036A40, // sys_gettimeofday
	0x075: 0x00036B20, // sys_getrusage
	0x076: 0x00034250, // sys_getsockopt
	0x078: 0x000354E0, // sys_readv
	0x079: 0x00035340, // sys_writev
	0x07A: 0x00035F90, // sys_settimeofday
	0x07C: 0x00034ED0, // sys_fchmod
	0x07D: 0x00035740, // sys_netgetiflist
	0x07E: 0x00036610, // sys_setreuid
	0x07F: 0x00035230, // sys_setregid
	0x080: 0x00036190, // sys_rename
	0x083: 0x000351B0, // sys_flock
	0x085: 0x00036A80, // sys_sendto
	0x086: 0x000368B0, // sys_shutdown
	0x087: 0x00035C40, // sys_socketpair
	0x088: 0x000359E0, // sys_mkdir
	0x089: 0x00034C30, // sys_rmdir
	0x08A: 0x00034140, // sys_utimes
	0x08C: 0x000365D0, // sys_adjtime
	0x08D: 0x00035720, // sys_kqueueex
	0x093: 0x00035980, // sys_setsid
	0x0A5: 0x00034470, // sys_sysarch
	0x0B6: 0x00036410, // sys_setegid
	0x0B7: 0x000342B0, // sys_seteuid
	0x0BC: 0x00036470, // sys_stat
	0x0BD: 0x00036870, // sys_fstat
	0x0BE: 0x00035250, // sys_lstat
	0x0BF: 0x00034950, // sys_pathconf
	0x0C0: 0x00035C00, // sys_fpathconf
	0x0C2: 0x00035190, // sys_getrlimit
	0x0C3: 0x00034D70, // sys_setrlimit
	0x0C4: 0x00036390, // sys_getdirentries
	0x0CA: 0x00036170, // sys___sysctl
	0x0CB: 0x00035820, // sys_mlock
	0x0CC: 0x00036210, // sys_munlock
	0x0CE: 0x00034CD0, // sys_futimes
	0x0D1: 0x000352B0, // sys_poll
	0x0E8: 0x00034370, // sys_clock_gettime
	0x0E9: 0x000357E0, // sys_clock_settime
	0x0EA: 0x000367E0, // sys_clock_getres
	0x0EB: 0x000363B0, // sys_ktimer_create
	0x0EC: 0x00034B30, // sys_ktimer_delete
	0x0ED: 0x00036890, // sys_ktimer_settime
	0x0EE: 0x00035D40, // sys_ktimer_gettime
	0x0EF: 0x00034EF0, // sys_ktimer_getoverrun
	0x0F0: 0x00036270, // sys_nanosleep
	0x0F1: 0x00035AA0, // sys_number241
	0x0F2: 0x00034A90, // sys_number242
	0x0F3: 0x00035920, // sys_number243
	0x0F7: 0x00036310, // sys_number247
	0x0FB: 0x00034E69, // sys_rfork
	0x0FD: 0x00035ED0, // sys_issetugid
	0x110: 0x00036670, // sys_getdents
	0x121: 0x00035D80, // sys_preadv
	0x122: 0x000352D0, // sys_pwritev
	0x136: 0x00034FD0, // sys_getsid
	0x13B: 0x00036490, // sys_aio_suspend
	0x144: 0x00034B50, // sys_mlockall
	0x145: 0x00035F50, // sys_munlockall
	0x147: 0x00034C50, // sys_sched_setparam
	0x148: 0x000358C0, // sys_sched_getparam
	0x149: 0x00034410, // sys_sched_setscheduler
	0x14A: 0x00035290, // sys_sched_getscheduler
	0x14B: 0x000350F0, // sys_sched_yield
	0x14C: 0x00034690, // sys_sched_get_priority_max
	0x14D: 0x000347B0, // sys_sched_get_priority_min
	0x14E: 0x000349E0, // sys_sched_rr_get_interval
	0x154: 0x000341A0, // sys_sigprocmask
	0x155: 0x000341E0, // sys_sigsuspend
	0x157: 0x000360B0, // sys_sigpending
	0x159: 0x000361D0, // sys_sigtimedwait
	0x15A: 0x00035E10, // sys_sigwaitinfo
	0x16A: 0x000363F0, // sys_kqueue
	0x16B: 0x00034650, // sys_kevent
	0x17B: 0x000345F0, // sys_mtypeprotect
	0x188: 0x00034710, // sys_uuidgen
	0x189: 0x00036B60, // sys_sendfile
	0x18D: 0x00034BB0, // sys_fstatfs
	0x190: 0x00034770, // sys_ksem_close
	0x191: 0x00035500, // sys_ksem_post
	0x192: 0x00035DA0, // sys_ksem_wait
	0x193: 0x00036B40, // sys_ksem_trywait
	0x194: 0x000348B0, // sys_ksem_init
	0x195: 0x000362D0, // sys_ksem_open
	0x196: 0x00035FB0, // sys_ksem_unlink
	0x197: 0x00034730, // sys_ksem_getvalue
	0x198: 0x00035F70, // sys_ksem_destroy
	0x1A0: 0x00036450, // sys_sigaction
	0x1A1: 0x000360F0, // sys_sigreturn
	0x1A5: 0x00034DD4, // sys_getcontext
	0x1A6: 0x00035B00, // sys_setcontext
	0x1A7: 0x00035C20, // sys_swapcontext
	0x1AD: 0x00034E20, // sys_sigwait
	0x1AE: 0x000344F0, // sys_thr_create
	0x1AF: 0x00034850, // sys_thr_exit
	0x1B0: 0x000351F0, // sys_thr_self
	0x1B1: 0x00034870, // sys_thr_kill
	0x1B9: 0x00035E90, // sys_ksem_timedwait
	0x1BA: 0x000341C0, // sys_thr_suspend
	0x1BB: 0x00034AF0, // sys_thr_wake
	0x1BC: 0x00035B60, // sys_kldunloadf
	0x1C6: 0x00034240, // sys__umtx_op
	0x1C7: 0x00036590, // sys_thr_new
	0x1C8: 0x000364F0, // sys_sigqueue
	0x1D0: 0x00035E50, // sys_thr_set_name
	0x1D2: 0x00035400, // sys_rtprio_thread
	0x1DB: 0x00034B90, // sys_pread
	0x1DC: 0x00035CA0, // sys_pwrite
	0x1DD: 0x00036570, // sys_mmap
	0x1DE: 0x00036070, // sys_lseek
	0x1DF: 0x00035110, // sys_truncate
	0x1E0: 0x00034B70, // sys_ftruncate
	0x1E1: 0x00034160, // sys_thr_kill2
	0x1E2: 0x00036AE0, // sys_shm_open
	0x1E3: 0x00036550, // sys_shm_unlink
	0x1E6: 0x00034D90, // sys_cpuset_getid
	0x1E7: 0x00036950, // sys_ps4_cpuset_getaffinity
	0x1E8: 0x00036110, // sys_ps4_cpuset_setaffinity
	0x1F3: 0x00034530, // sys_openat
	0x203: 0x00035BE0, // sys___cap_rights_get
	0x20A: 0x00035620, // sys_pselect
	0x214: 0x000356E0, // sys_regmgr_call
	0x215: 0x00035460, // sys_jitshm_create
	0x216: 0x00035A40, // sys_jitshm_alias
	0x217: 0x00034930, // sys_dl_get_list
	0x218: 0x00035780, // sys_dl_get_info
	0x21A: 0x000356C0, // sys_evf_create
	0x21B: 0x00034B10, // sys_evf_delete
	0x21C: 0x00035A60, // sys_evf_open
	0x21D: 0x00035640, // sys_evf_close
	0x21E: 0x00035900, // sys_evf_wait
	0x21F: 0x000360D0, // sys_evf_trywait
	0x220: 0x00035A80, // sys_evf_set
	0x221: 0x00035FF0, // sys_evf_clear
	0x222: 0x00034E00, // sys_evf_cancel
	0x223: 0x000358E0, // sys_query_memory_protection
	0x224: 0x000351D0, // sys_batch_map
	0x225: 0x000353E0, // sys_osem_create
	0x226: 0x000343B0, // sys_osem_delete
	0x227: 0x00034330, // sys_osem_open
	0x228: 0x00036930, // sys_osem_close
	0x229: 0x000359C0, // sys_osem_wait
	0x22A: 0x00035FD0, // sys_osem_trywait
	0x22B: 0x00035C60, // sys_osem_post
	0x22C: 0x00035540, // sys_osem_cancel
	0x22D: 0x000352F0, // sys_namedobj_create
	0x22E: 0x00034FF0, // sys_namedobj_delete
	0x22F: 0x00036BC0, // sys_set_vm_container
	0x230: 0x00034AB0, // sys_debug_init
	0x233: 0x00035420, // sys_opmc_enable
	0x234: 0x00034490, // sys_opmc_disable
	0x235: 0x000354A0, // sys_opmc_set_ctl
	0x236: 0x000354C0, // sys_opmc_set_ctr
	0x237: 0x00035F10, // sys_opmc_get_ctr
	0x23C: 0x00034D30, // sys_virtual_query
	0x249: 0x00036350, // sys_is_in_sandbox
	0x24A: 0x00034F10, // sys_dmem_container
	0x24B: 0x000357C0, // sys_get_authinfo
	0x24C: 0x00034310, // sys_mname
	0x24F: 0x00034910, // sys_dynlib_dlsym
	0x250: 0x00034C10, // sys_dynlib_get_list
	0x251: 0x000366B0, // sys_dynlib_get_info
	0x252: 0x000355C0, // sys_dynlib_load_prx
	0x253: 0x000345B0, // sys_dynlib_unload_prx
	0x254: 0x00036430, // sys_dynlib_do_copy_relocations
	0x256: 0x000353C0, // sys_dynlib_get_proc_param
	0x257: 0x00036710, // sys_dynlib_process_needed_and_relocate
	0x258: 0x00034180, // sys_sandbox_path
	0x259: 0x00034CF0, // sys_mdbg_service
	0x25A: 0x00035380, // sys_randomized_path
	0x25B: 0x000361F0, // sys_rdup
	0x25C: 0x000347F0, // sys_dl_get_metadata
	0x25D: 0x00034F30, // sys_workaround8849
	0x25E: 0x000346F0, // sys_is_development_mode
	0x25F: 0x00035860, // sys_get_self_auth_info
	0x260: 0x00036B00, // sys_dynlib_get_info_ex
	0x262: 0x00036BA0, // sys_budget_get_ptype
	0x263: 0x00034A00, // sys_get_paging_stats_of_all_threads
	0x264: 0x00036910, // sys_get_proc_type_info
	0x265: 0x00034120, // sys_get_resident_count
	0x267: 0x00035480, // sys_get_resident_fmem_count
	0x268: 0x00036530, // sys_thr_get_name
	0x269: 0x00035B40, // sys_set_gpo
	0x26A: 0x00035840, // sys_get_paging_stats_of_all_objects
	0x26B: 0x00034630, // sys_test_debug_rwmem
	0x26C: 0x00034750, // sys_free_stack
	0x26E: 0x00034350, // sys_ipmimgr_call
	0x26F: 0x000357A0, // sys_get_gpo
	0x270: 0x00036B80, // sys_get_vm_map_timestamp
	0x271: 0x00036130, // sys_opmc_set_hw
	0x272: 0x00034C70, // sys_opmc_get_hw
	0x273: 0x000342F0, // sys_get_cpu_usage_all
	0x274: 0x00035960, // sys_mmap_dmem
	0x275: 0x00034D10, // sys_physhm_open
	0x276: 0x00035520, // sys_physhm_unlink
	0x278: 0x00036AC0, // sys_thr_suspend_ucontext
	0x279: 0x00034FB0, // sys_thr_resume_ucontext
	0x27A: 0x00034F70, // sys_thr_get_ucontext
	0x27B: 0x00035070, // sys_thr_set_ucontext
	0x27C: 0x00034CB0, // sys_set_timezone_info
	0x27D: 0x00035A00, // sys_set_phys_fmem_limit
	0x27E: 0x00034DB0, // sys_utc_to_localtime
	0x27F: 0x00036BE0, // sys_localtime_to_utc
	0x280: 0x00035D60, // sys_set_uevt
	0x281: 0x000348D0, // sys_get_cpu_usage_proc
	0x282: 0x00035150, // sys_get_map_statistics
	0x283: 0x00035EF0, // sys_set_chicken_switches
	0x286: 0x00036810, // sys_get_kernel_mem_statistics
	0x287: 0x00035A20, // sys_get_sdk_compiled_version
	0x288: 0x00034390, // sys_app_state_change
	0x289: 0x000365B0, // sys_dynlib_get_obj_member
	0x28C: 0x00034430, // sys_process_terminate
	0x28D: 0x00034BF0, // sys_blockpool_open
	0x28E: 0x00034990, // sys_blockpool_map
	0x28F: 0x000363D0, // sys_blockpool_unmap
	0x290: 0x00036010, // sys_dynlib_get_info_for_libdbg
	0x291: 0x000350D0, // sys_blockpool_batch
	0x292: 0x00034830, // sys_fdatasync
	0x293: 0x00034D50, // sys_dynlib_get_list2
	0x294: 0x00036AA0, // sys_dynlib_get_info2
	0x295: 0x00036250, // sys_aio_submit
	0x296: 0x000347D0, // sys_aio_multi_delete
	0x297: 0x00035600, // sys_aio_multi_wait
	0x298: 0x000346B0, // sys_aio_multi_poll
	0x299: 0x00036150, // sys_aio_get_data
	0x29A: 0x000355E0, // sys_aio_multi_cancel
	0x29B: 0x00034590, // sys_get_bio_usage_all
	0x29C: 0x00035C80, // sys_aio_create
	0x29D: 0x000366F0, // sys_aio_submit_cmd
	0x29E: 0x000365F0, // sys_aio_init
	0x29F: 0x00036050, // sys_get_page_table_stats
	0x2A0: 0x000364B0, // sys_dynlib_get_list_for_libdbg
	0x2A1: 0x00036650, // sys_blockpool_move
	0x2A2: 0x000364D0, // sys_virtual_query_all
	0x2A3: 0x00035580, // sys_reserve_2mb_page
	0x2A4: 0x00035E30, // sys_cpumode_yield
	0x2A5: 0x00035940, // sys_wait6
	0x2A6: 0x000353A0, // sys_cap_rights_limit
	0x2A7: 0x00034970, // sys_cap_ioctls_limit
	0x2A8: 0x000356A0, // sys_cap_ioctls_get
	0x2A9: 0x00035E70, // sys_cap_fcntls_limit
	0x2AA: 0x00034610, // sys_cap_fcntls_get
	0x2AB: 0x00036970, // sys_bindat
	0x2AC: 0x00035170, // sys_connectat
	0x2AD: 0x000343D0, // sys_chflagsat
	0x2AE: 0x00034220, // sys_accept4
	0x2AF: 0x00034810, // sys_pipe2
	0x2B0: 0x00035210, // sys_aio_mlock
	0x2B1: 0x000368F0, // sys_procctl
	0x2B2: 0x00035BA0, // sys_ppoll
	0x2B3: 0x00035AE0, // sys_futimens
	0x2B4: 0x00036290, // sys_utimensat
	0x2B5: 0x00035800, // sys_numa_getaffinity
	0x2B6: 0x00035660, // sys_numa_setaffinity
	0x2C1: 0x00034670, // sys_get_phys_page_size
	0x2C9: 0x000368D0, // sys_get_ppr_sdk_compiled_version
	0x2CC: 0x00034EB0, // sys_openintr
	0x2CD: 0x000359A0, // sys_dl_get_info_2
	0x2CE: 0x00034F90, // sys_acinfo_add
	0x2CF: 0x00034200, // sys_acinfo_delete
	0x2D0: 0x00036230, // sys_acinfo_get_all_for_coredump
	0x2D1: 0x000362F0, // sys_ampr_ctrl_debug
};

// Kernel stack offsets
const OFFSET_KERNEL_STACK_COOKIE                = 0x00000930;
const OFFSET_KERNEL_STACK_SYS_SCHED_YIELD_RET   = 0x00000808;

// Kernel text-relative offsets
const OFFSET_KERNEL_DATA                        = 0x00C40000;
const OFFSET_KERNEL_SYS_SCHED_YIELD_RET         = 0x00599C42;
const OFFSET_KERNEL_ALLPROC                     = 0x0355DD00; // data = 0x0290DD00
const OFFSET_KERNEL_SECURITY_FLAGS              = 0x072866EC; // data = 0x066366EC
const OFFSET_KERNEL_TARGETID                    = 0x072866F5; // data = 0x066366F5
const OFFSET_KERNEL_QA_FLAGS                    = 0x07286710; // data = 0x06636710
const OFFSET_KERNEL_UTOKEN_FLAGS                = 0x07286778; // data = 0x06636778
const OFFSET_KERNEL_PRISON0                     = 0x02A63470; // data = 0x01E13470
const OFFSET_KERNEL_ROOTVNODE                   = 0x07493510; // data = 0x06843510

const OFFSET_KERNEL_PS4SDK                      = 0x023D8F38;